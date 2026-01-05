import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../pages/login/service/auth.service';

type UserRole = {
  authority: string;
};

@Injectable({
  providedIn: 'root',
})
export class MenuItemsService {
  constructor(private readonly _authService: AuthService) {}

  getMenuItems(logo: string, logoutCallback: () => void): MenuItem[] {
    if (this._authService.isAuthenticated()) {
      return this._getAuthenticatedMenuItems(logoutCallback);
    }
    return this._getUnauthenticatedMenuItems();
  }

  private _getAuthenticatedMenuItems(logoutCallback: () => void): MenuItem[] {
    const userRoles = this._authService.getUserRoles();
    const menuItems: MenuItem[] = [];

    menuItems.push(this._createHomeMenuItem());

    if (this._hasRole(userRoles, 'ROLE_ADMINISTRATOR')) {
      menuItems.push(this._createManagementMenuItem());
    }

    menuItems.push(this._createLogoutMenuItem(logoutCallback));

    return menuItems;
  }

  private _getUnauthenticatedMenuItems(): MenuItem[] {
    return [this._createLoginMenuItem()];
  }

  private _createHomeMenuItem(): MenuItem {
    return {
      label: 'Accueil',
      icon: 'pi pi-fw pi-home text-textNavbar',
      routerLink: '/',
      styleClass: 'text-textNavbar items-center px-2',
    };
  }

  private _createManagementMenuItem(): MenuItem {
    return {
      label: 'Gestion',
      icon: 'pi pi-fw pi-bars text-textNavbar',
      styleClass: 'text-textNavbar items-center px-2',
      items: [
        {
          label: 'Liste des voyages',
          icon: 'pi pi-fw pi-image text-textNavbar',
          routerLink: '/gestion-employes',
          styleClass: 'text-textNavbar items-center px-2',
        },
        {
          label: 'Carte',
          icon: 'pi pi-fw pi-map text-textNavbar',
          routerLink: '/gestion-vehicules',
          styleClass: 'text-textNavbar items-center px-2',
        },
      ],
    };
  }

  private _createLogoutMenuItem(logoutCallback: () => void): MenuItem {
    return {
      label: 'Se déconnecter',
      icon: 'pi pi-fw pi-sign-out',
      command: logoutCallback,
      styleClass: 'items-center rounded-md border-none bg-mainButton',
    };
  }

  private _createLoginMenuItem(): MenuItem {
    return {
      label: 'Se connecter',
      routerLink: '/authentification',
      icon: 'pi pi-fw pi-user ',
      styleClass: 'items-center rounded-md border-none bg-mainButton',
    };
  }

  private _hasRole(userRoles: UserRole[], roleName: string): boolean {
    return userRoles?.some(role => role.authority === roleName) ?? false;
  }
}
