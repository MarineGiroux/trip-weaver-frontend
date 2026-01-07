# Frontend project template : Angular 🛡️

This repository is a Angular project template shipped with a base configuration in order to have a clean base to work with, for you and your teammates. 

This project has been initialized from Angular CLI version 18.2.

🔥 To properly understand the structure of this project, open the `package.json` file and take your time reviewing it.

## 🚀 Simple CI/CD Configured!

✅ **Ready-to-use CI/CD pipeline** - Automated tests and simplified deployment

### 🎯 Quick Commands

```bash
# 🧪 Test everything at once
./test-app.sh

# 🐳 Run with Docker
npm run docker:dev      # Development (port 4200)
npm run docker:staging   # Staging (port 4201)
npm run docker:prod      # Production (port 4202)

# 🛑 Stop
npm run docker:stop
```

### 📖 Documentation
- 🔧 **CI/CD Pipeline** - File `.github/workflows/simple-cicd.yml`


## Branch protection rules
- You need to manually add your protection rules from your repository instance settings :
  - Lock pushes on production, staging & development ;
  - Make PR mandatory towards production, staging & development
  - PR, any branch ➡️ development :
     - All contributors must add their review.
  - PR, development ➡️ staging :
     - Only the `development` branch can make a PR to the `staging` branch ;
     - All contributors must add their review.
  - PR, staging ➡️ production :
    - Only the `staging` branch can make a PR to the `production` branch ;
    - All contributors must add their review ;
    - The owner of the repository must approve the PR.
 
## Same code format : Prettier
- This project uses Prettier. 
- Prettier makes sure that everyone has the same code format and standardize it. It helps developers to be focused on creating feature, not formatting. The same format for everyone also means easier code reviews.
- The configuration file is in the `source directory` > `.prettierrc.json`.
- You can install Prettier plugin on your IDE if you want, it would help you to configure when prettier should run. For instance, you can choose to let it run after every file save. But you are not forced to install the plugin because **Prettier will run every time after you are trying to commit**.
- You can run Prettier at any time with the following command: `npm run prettier`

⚠️ You cannot edit Prettier config file. Otherwise your commit won't pass.


## Same code rules : Eslint
- This project uses Eslint. The configuration file is in the `source directory` > `eslint.config.js`.
- Eslint prevent a lot of typo mistakes & future bugs to come. It enforces code rules & conventions.
- It uses all recommanded configurations from Eslint, Tslint and Nglint. It has a few more custom configurations specific for this project.
- You can run Eslint at any time with the following command: ng lint

⚠️ You cannot edit Eslint config file. Otherwise your commit won't pass.

## Clean git workflow : Husky
This project uses Husky. It enforces rules to keep your git workflow clean & consistent. It mainly uses the pre-commit git hook. Before each commit, Husky:
- Makes sure you did not modify Prettier, Eslint or Husky configuration files ;
- Run Prettier and Eslint automatically ;
- Validate branch name and help you to rename it with good practices if test fails.
- You need to enable it once after cloning the project by running the `npm run prepare` command to set up your local instance.
- Since all tests run locally with Husky are also executed on CI after every push, not enabling Husky upfront will result in slower feedback on your Git practices, as you’ll have to wait for CI to complete the checks 🙈.

## Automatic documentation : compodoc
- This project uses compodoc : a dynamic documentation of your whole application. 
- It builds a clean documentation on your localhost and gives you a nice overview of your application.
- It needs to be rebuilt after each code modification. You can run it with the following command: `npm run doc`


## Environments
- This application is creates around 3 environments : `development`, `staging` and `production`.
- Npm scripts about serving, building and e2e testing the application allow you to easily swap between them.
- Some checks are made to make sure that anyone can't add a new environement in a snap.
- These environments are fundamentals ; be sure to know what you do when you manipulate them.

## Tests
1. Unit & Integration tests
   - Jest is used for both **unit** and **integration** tests.
   - To test the application, run the following command: `npm run test`.


2. End to End tests
   - Cypress is used for End to End tests.
   - To test the application, run any command starting with `e2e`.
   - You will choose the right command based on the environment you want to test.
   - `e2e:ui` related commands will trigger Cypress with its user interface.
   - `e2e:ci` related commands will trigger Cypress in command line interface.
   - It's not anticipated to run your e2e tests in the development environment since e2e is designed for build & production purposes.

## CI/CD
- This project has a Dockerfile to build an image of the application
- This project has a CI/CD pipeline in `source directory` > `.github` > `workflows`.

Flow details:
- When a push is triggered on any branch (except staging or prod), the CI is triggered and run unit tests & integration tests.
- When a push is triggered on staging, the CI is triggered and run unit tests, integration tests **and E2E tests**.
- If it fails, details can be found on the github repository > actions tab.
- If everything is fine, then the CD is triggered and an image of the application is built with Docker and then deployed on DockerHub.
- The VPS is configured to listen successfull pushes on staging branch by a webhook, and then pull the docker image from DockerHub, stops the current running docker container & start the new one.
- User only need to refresh its browser & taadaa : the frontend application on staging environnement is now successfully deployed 🎉

## 🐳 Docker Commands

### Quick Start
```bash
# Build and run in one command (production)
docker build -t trip-weaver . && docker run -d -p 8080:80 --name trip-weaver-container trip-weaver
```

### Environment-specific builds

#### Development
```bash
# With ARG
docker build --build-arg BUILD_ENV=development -t trip-weaver-dev .
docker run -d -p 4200:80 --name trip-weaver-dev-container trip-weaver-dev
```

#### Staging
```bash
# With ARG
docker build --build-arg BUILD_ENV=staging -t trip-weaver-staging .
docker run -d -p 4200:80 --name trip-weaver-staging-container trip-weaver-staging
```

#### Production
```bash
# With ARG (default)
docker build -t trip-weaver-prod .
docker run -d -p 8082:80 --name trip-weaver-prod-container trip-weaver-prod
```

### Container Management
```bash
# Stop all TripWeaver containers
docker stop $(docker ps -q --filter "name=trip-weaver")

# Remove all TripWeaver containers
docker rm $(docker ps -aq --filter "name=trip-weaver")

# Remove all TripWeaver images
docker rmi $(docker images -q --filter "reference=trip-weaver*")
```

### Access URLs
- **Development**: http://localhost:8080
- **Staging**: http://localhost:8081
- **Production**: http://localhost:8082

👉 The pipeline is the same with the production branch.

## 📚 Architecture Documentation

### 🗺️ Project Structure

```
src/app/
├── common/              # Shared components, services and pages
│   ├── components/      # Reusable components (table, form-field, buttons, nav-bar, etc.)
│   ├── pages/           # Common pages (home, login, not-found, etc.)
│   ├── routes/          # Common routes
│   ├── services/        # Shared services (date, auth, etc.)
│   └── shared/          # Shared models and types
├── features/            # Application functional modules
│   ├── collaborator/    # Collaborator management
│   ├── management/      # Administrative management (registration)
│   ├── regulator/       # Regulator (calendar, directory)
│   ├── transporter/     # Transporter management
│   └── vehicle/         # Vehicle management
└── general/             # Global types and utilities
```

### 🛣️ Application Routes

The application uses **lazy loading** to optimize performance. All routes are defined in `app.routes.ts`.

#### Main Routes

| Route | Component | Protection | Description |
|-------|-----------|------------|-------------|
| `/` | HomePageComponent | ❌ | Home page |
| `/authentification` | LoginPageComponent | ❌ | Login page |
| `/register` | RegistrationPageComponent | ❌ | New company registration |
| `/reinitialisation-password` | ResetPasswordPageComponent | ❌ | Password reset |
| `/page-patient` | DirectoryComponent | ✅ AuthGuard | Patient directory management |
| `/calendar` | CalendarPageComponent | ✅ AuthGuard | Transport calendar |
| `/gestion-employes` | CollaboratorPageComponent | ✅ AuthGuard | Employee management |
| `/gestion-vehicules` | DestinationComponent | ✅ AuthGuard | Vehicle management |
| `/transports` | TransporterPageComponent | ✅ AuthGuard | Transport management |
| `/conditions-generales` | ConditionsGeneralesComponent | ❌ | Terms of Service |
| `/politique-confidentialite` | PolitiqueConfidentialiteComponent | ❌ | Privacy Policy |
| `/not-found` | NotFoundComponent | ❌ | 404 Page |
| `/**` | - | - | Redirect to /not-found |

#### 🔒 AuthGuard

The `AuthGuard` (`src/app/common/pages/login/guard/guard.ts`) protects routes requiring authentication:
- Checks authentication status via `AuthService.isAuthenticated$`
- Redirects to `/authentification` if not authenticated
- Uses observable pattern with `take(1)` for single emission

```typescript
canActivate(): Observable<boolean | UrlTree> {
  return this.authService.isAuthenticated$.pipe(
    take(1),
    map(isAuthenticated =>
      isAuthenticated ? true : this.router.createUrlTree(['/authentification'])
    )
  );
}
```

### 📊 Table Component

**Location**: `src/app/common/components/table/table.component.ts`

The table component is a reusable wrapper around **PrimeNG Table** with advanced features.

#### Features

✅ **Configurable columns**: Dynamic column definition
✅ **Global search**: Filtering across multiple fields
✅ **Complex columns**: Support for arrays and objects
✅ **Nested values**: Access to nested properties (e.g., `adress.city`)
✅ **CRUD actions**: Integration of edit and delete
✅ **Custom formatting**: Formatters for complex columns
✅ **Multiple selection**: Checkbox support

#### Component Inputs

```typescript
@Input() data: any[] = [];                    // Table data
@Input() columns: Column[] = [];              // Column configuration
@Input() globalFilterFields: string[] = [];   // Fields for global search
@Input() fieldToShow: string = '';            // Main field to display
@Input() facadeService!: any;                 // Facade service for CRUD
@Input() mainFieldsConfig: any[] = [];        // Main fields config
@Input() nestedFieldsConfig: any[] = [];      // Nested fields config
@Input() form!: FieldConfig[];                // Edit form configuration
@Input() complexColumns: {                    // Complex columns (array/object)
  field: string;
  header: string;
  type: 'array' | 'object';
  displayField?: string;
  formatter?: (value: any) => string;
}[] = [];
```

#### Usage Example

```typescript
// In parent component
columns = [
  { field: 'firstname', header: 'First Name' },
  { field: 'lastname', header: 'Last Name' },
  { field: 'adress', header: 'Address' }
];

complexColumns = [
  {
    field: 'patients',
    header: 'Patients',
    type: 'array',
    formatter: (patients) => patients.map(p => `${p.firstname} ${p.lastname}`).join(', ')
  }
];

globalFilterFields = ['firstname', 'lastname', 'phone'];
```

#### Utility Methods

- **`getNestedValue(rowData, field)`**: Access nested properties (e.g., `vehicle.registration`)
- **`isComplexColumn(field)`**: Check if a column is complex
- **`formatComplexValue(rowData, field)`**: Format complex values (arrays/objects)

### 🏗️ Architecture & Patterns

#### 🎯 Facade-Store-HTTP Pattern

The application uses a 3-layer pattern for data management:

```
Component
    ↓
Facade Service (Public API)
    ↓
Store Service (State management)
    ↓
HTTP Service (API calls)
```

##### 1️⃣ **HTTP Service** (`*-http.service.ts`)
- API calls management
- Response transformation
- HTTP error handling

##### 2️⃣ **Store Service** (`*-store.service.ts`)
- Local state management with `BehaviorSubject`
- In-memory CRUD (setAll, create, update, delete)
- Observables for reactivity

```typescript
@Injectable({ providedIn: 'root' })
export class PatientStoreService {
  private _patients$ = new BehaviorSubject<PatientTableDTO[]>([]);

  get patients$(): Observable<PatientTableDTO[]> {
    return this._patients$.asObservable();
  }

  setAll(patients: PatientTableDTO[]): void {
    this._patients$.next(patients);
  }

  create(patient: PatientTableDTO): void {
    this._patients$.next([...this._patients$.value, patient]);
  }

  update(patient: PatientTableDTO): void {
    const updated = this._patients$.value.map(p =>
      p.id === patient.id ? patient : p
    );
    this._patients$.next(updated);
  }

  delete(id: string): void {
    const filtered = this._patients$.value.filter(p => p.id !== id);
    this._patients$.next(filtered);
  }
}
```

##### 3️⃣ **Facade Service** (`*-facade.service.ts`)
- Public API for components
- HTTP + Store orchestration
- Side effects management

```typescript
@Injectable({ providedIn: 'root' })
export class PatientFacadeService {
  constructor(
    private httpService: DirectoryHttpService,
    private storeService: PatientStoreService
  ) {}

  get patients$(): Observable<PatientTableDTO[]> {
    return this.storeService.patients$;
  }

  loadAll$(): Observable<PatientTableDTO[]> {
    return this.httpService.getRegularPatients$().pipe(
      map(response => response.payload),
      tap(patients => this.storeService.setAll(patients))
    );
  }

  create$(patient: Patient): Observable<Patient> {
    return this.httpService.create$(patient).pipe(
      map(response => response.payload),
      tap(created => {
        const dto = this.convertToDTO(created);
        this.storeService.create(dto);
      })
    );
  }
}
```

#### 📦 Functional Modules

Each feature follows the same structure:

```
feature/
├── component/         # Specific sub-components
├── model/            # Interfaces and types
├── page/             # Page components
├── routes/           # Routing configuration
└── service/          # Services (facade, store, http)
```

#### 🔄 State Management

- **BehaviorSubject** for local state (stores)
- **Observables** for data streams
- **RxJS operators** for transformation (map, tap, catchError, switchMap)
- **take(1)** pattern for one-shot operations

### 🧩 Reusable Components

#### Form Components

**`app-form-field`** (`src/app/common/components/form/form-field/`)
- Unified form field management
- Support for various types: text, email, password, tel, checkbox, textarea, datetime-local
- Validation and error display
- Full ARIA accessibility

**Main inputs**:
```typescript
@Input() control: AbstractControl;      // Form control
@Input() label: string;                 // Field label
@Input() name: string;                  // Field name
@Input() type: string;                  // Field type
@Input() isRequired: boolean = false;   // Required field
@Input() isSubmitted: boolean = false;  // Submission state
@Input() placeholder?: string;          // Placeholder
@Input() rows?: number;                 // Rows (textarea)
```

#### Navigation Components

**`app-nav-bar`**: Main navigation with:
- Responsive desktop/mobile menu
- Clickable logo
- User information
- Dark mode toggle
- Logout

#### Action Components

- **`app-action-edit`**: Edit button/dialog
- **`app-action-delete`**: Delete button/dialog
- **`app-sky-blue-button`**: Primary button
- **`app-dark-blue-button`**: Secondary button
- **`app-red-button`**: Delete/danger button

### 📅 Calendar with FullCalendar

**Location**: `src/app/features/regulator/calendar/`

The calendar module uses **FullCalendar** to manage transports.

#### Features

✅ Multiple views: Month, Week, Day, List
✅ Drag & Drop to move events
✅ Resize to modify duration
✅ Urgent events with 🚨 badge
✅ Color coding per vehicle
✅ Full accessibility (ARIA, keyboard navigation)
✅ Color contrast management

#### Configuration

**File**: `src/app/features/regulator/calendar/config/calendar-options.config.ts`

```typescript
calendarOptions = {
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
  locale: 'fr',
  editable: true,
  eventResizableFromStart: true,
  selectable: true,
  // ... customButtons, eventDidMount, etc.
};
```

#### Key Services

- **`ConvertEntityToCalendarService`**: Converts data to FullCalendar events
- **`ColorContrastService`**: Calculates optimal text/background contrast
- **`CalendarFacadeService`**: CRUD management for events

### 🔐 Authentication

**Service**: `src/app/common/pages/login/service/auth.service.ts`

- JWT token management
- Observable `isAuthenticated$` for status
- Login/logout methods
- Secure storage (localStorage)

### 🛠️ Utility Services

**DateServices** (`src/app/common/services/date.services.ts`)
- French date formatting
- Format conversion
- Date range validation

### 🎨 Main Libraries

- **Angular 19**: Main framework
- **PrimeNG 19**: UI components (Table, Dialog, AutoComplete, Select, etc.)
- **FullCalendar 6**: Calendar management
- **TailwindCSS**: Utility-first styling
- **RxJS 7**: Reactive programming

### 🧪 Tests

- **Jest**: Unit and integration tests
- **Cypress**: E2E tests
- Environment-specific configuration (development, staging, production)

### 📝 Code Conventions

- **Prettier**: Automatic code formatting
- **ESLint**: Strict linting rules
- **Husky**: Pre-commit hooks for validation
- **Standalone Components**: Modern Angular architecture without NgModules

### 🚀 Deployment

- **Docker**: Multi-environment builds
- **CI/CD**: GitHub Actions pipeline
- **Environments**: Development, Staging, Production
- **Webhooks**: Automatic deployment on push

## Happy coding 🔥🔥🔥
