describe('Authentication E2E Tests', () => {
  let authData: any;

  before(() => {
    cy.fixture('auth').then((data) => {
      authData = data;
    });
  });

  beforeEach(() => {
    cy.visit('/');
    cy.intercept('POST', '**/api/auth/login', { fixture: 'auth.json' }).as('loginRequest');
  });

  describe('Navigation to login page', () => {
    it('should navigate to login page from home', () => {
      cy.get('.burger-button').click();
      cy.contains('Se connecter').click();
      cy.url().should('include', '/authentification');
      cy.contains('Connectez-vous').should('be.visible');
    });
  });

  describe('Login page', () => {
    beforeEach(() => {
      cy.visit('/authentification');
    });

    it('should display all login page elements', () => {
      cy.contains('Connectez-vous').should('be.visible');
      cy.get('input[name="email"]').should('be.visible');
      cy.get('input[name="password"]').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible');
      cy.contains('Inscrivez-vous').should('be.visible');
    });

    it('should handle burger menu on mobile', () => {
      cy.viewport('iphone-6');
      cy.visit('/');
      cy.get('.burger-button').should('be.visible');
      cy.get('.burger-button').click();
      cy.get('.mobile-menu').should('be.visible');
      cy.get('.mobile-menu').within(() => {
        cy.contains('Se connecter').should('be.visible');
      });
      cy.get('.burger-button').click();
      cy.get('.mobile-menu').should('not.exist');
    });

    it('should have correct placeholders and labels', () => {
      cy.get('input[name="email"]').should('have.attr', 'placeholder', 'Email');
      cy.get('input[name="password"]').should('have.attr', 'placeholder', 'Mot de passe');
      cy.contains('Identifiant').should('be.visible');
      cy.contains('Mot de passe').should('be.visible');
    });
  });

  describe('Form validation', () => {
    beforeEach(() => {
      cy.visit('/authentification');
    });

    it('should display errors for empty fields', () => {
      cy.get('button[type="submit"]').click();
      cy.contains('Ce champ est requis.').should('be.visible');
    });

    it('should validate email format', () => {
      cy.get('input[name="email"]').type('email-invalide');
      cy.get('input[name="password"]').type('motdepasse123');
      cy.get('button[type="submit"]').click();
      cy.contains("L'adresse e-mail n'est pas au bon format.").should('be.visible');
    });
  });

  describe('Authentication', () => {
    beforeEach(() => {
      cy.visit('/authentification');
      cy.intercept('POST', '**/auth/login', { fixture: 'auth.json' }).as('loginRequest');
    });

    it('should login with valid credentials', () => {
      cy.intercept('POST', '**/auth/login', {
        statusCode: 200,
        body: {
          success: true,
          message: 'Connexion réussie',
          payload: {
            token: 'fake-jwt-token-for-testing-12345'
          }
        }
      }).as('loginSuccess');

      cy.get('input[name="email"]').type(authData.validUser.email);
      cy.get('input[name="password"]').type(authData.validUser.password);
      cy.get('button[type="submit"]').click();

      cy.wait('@loginSuccess').then((interception) => {
        expect(interception.request.body).to.deep.include({
          email: authData.validUser.email,
          password: authData.validUser.password
        });
      });

      cy.url().should('not.include', '/authentification');
    });

    it('should display error with invalid credentials', () => {
      cy.intercept('POST', '**/auth/login', {
        statusCode: 401,
        body: { message: 'Identifiants invalides' }
      }).as('loginError');

      cy.get('input[name="email"]').type(authData.invalidUser.email);
      cy.get('input[name="password"]').type(authData.invalidUser.password);
      cy.get('button[type="submit"]').click();

      cy.wait('@loginError');
      cy.contains('Identifiants invalides').should('be.visible');
      cy.url().should('include', '/authentification');
    });

    it('should handle server errors', () => {
      cy.intercept('POST', '**/auth/login', {
        statusCode: 500,
        body: { message: 'Erreur interne du serveur' }
      }).as('serverError');

      cy.get('input[name="email"]').type(authData.validUser.email);
      cy.get('input[name="password"]').type(authData.validUser.password);
      cy.get('button[type="submit"]').click();

      cy.wait('@serverError');
      cy.contains('Erreur interne du serveur').should('be.visible');
    });
  });

  describe('Navigation', () => {
    beforeEach(() => {
      cy.visit('/authentification');
    });

    it('should navigate to registration page', () => {
      cy.contains('Inscrivez-vous').click();
      cy.url().should('include', '/register');
    });
  });

  describe('Security', () => {
    beforeEach(() => {
      cy.visit('/authentification');
    });

    it('should hide password by default', () => {
      cy.get('input[name="password"]').should('have.attr', 'type', 'password');
    });

    it('should be able to toggle password visibility', () => {
      cy.get('input[name="password"]').type('motdepasse123');
      cy.get('app-password-toggle').should('exist');
      cy.get('app-password-toggle button').click();
      cy.get('input[name="password"]').should('have.attr', 'type', 'text');
      cy.get('app-password-toggle button').click();
      cy.get('input[name="password"]').should('have.attr', 'type', 'password');
    });
  });

  describe('Responsive Design', () => {
    beforeEach(() => {
      cy.visit('/authentification');
    });

    it('should be responsive on mobile', () => {
      cy.viewport('iphone-6');
      cy.contains('Connectez-vous').should('be.visible');
      cy.get('input[name="email"]').should('be.visible');
      cy.get('input[name="password"]').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible');
    });

    it('should be responsive on tablet', () => {
      cy.viewport('ipad-2');
      cy.contains('Connectez-vous').should('be.visible');
      cy.get('input[name="email"]').should('be.visible');
      cy.get('input[name="password"]').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible');
    });
  });
});
