# SIGPQR Front-End — Init File

## Project Overview

Angular 8 SPA for SIGPQR (Sistema de Gestión de Peticiones, Quejas y Reclamos). Role-based UI with three portals: Admin, Coordinator, and Student. Communicates with a Laravel REST API via JWT authentication.

- **Framework:** Angular 8.1.2
- **Language:** TypeScript 3.4.3
- **UI:** Material Design + Materialize CSS + Material Dashboard Pro
- **Rich Text:** CKEditor 5 (decoupled document)
- **Alerts:** SweetAlert2
- **State:** RxJS BehaviorSubject + localStorage

---

## Directory Structure

```
src/app/
├── admin/                          # Admin module (lazy-loaded style)
│   ├── admin.module.ts
│   ├── admin-routing.module.ts
│   └── components/
│       ├── admin-home/             # Dashboard with stats
│       ├── admin-section/          # Layout wrapper
│       ├── coordinators-add/       # Assign coordinator
│       ├── coordinators-adit/      # Edit coordinator
│       ├── coordinators-home/      # List coordinators
│       ├── disabled-section/       # Manage soft-deleted items
│       ├── faculties/              # List faculties
│       ├── faculties-edit/         # Edit faculty
│       ├── programs/               # List programs
│       ├── programs-add/           # Create program
│       ├── programs-edit/          # Edit program
│       ├── users/                  # List teachers
│       ├── users-add/              # Create teacher
│       └── users-edit/             # Edit teacher
├── student/                        # Student module
│   ├── student.module.ts
│   ├── student-routing.module.ts
│   └── components/
│       ├── home-student/           # Student dashboard
│       ├── requests-add/           # Create PQR (CKEditor + file upload)
│       ├── requests-timeline/      # View request + responses timeline
│       ├── studen-requests/        # List own requests
│       ├── studen-section/         # Layout wrapper
│       └── student-profile/        # Profile page
├── coordinator/                    # Coordinator module
│   ├── coordinator.module.ts
│   ├── coordinator-routing.module.ts
│   └── components/
│       ├── coordinator-home/       # Dashboard
│       ├── coordinator-profile/    # Profile
│       ├── coordinator-requests/   # View/respond to requests by type
│       └── estructura/             # Layout component
├── components/                     # Shared/auth components
│   ├── login/                      # Login page
│   ├── register/                   # Student registration
│   ├── verify/                     # Email verification
│   ├── forgot-password/            # Password reset modal
│   ├── error/                      # 404/error page
│   ├── footer/
│   └── logo-section/
├── models/                         # TypeScript models
│   ├── User.ts, Student.ts, Coordinator.ts
│   ├── Faculty.ts, Program.ts, Profile.ts
│   ├── _Request.ts, _RequestType.ts, _Response.ts
│   ├── Attachment.ts, AttachmentRequest.ts, AttachmentResponse.ts
├── services/                       # HTTP services
│   ├── authService/auth.service.ts
│   ├── admin/admin.service.ts
│   ├── coodinator/coordinator.service.ts
│   ├── faculty/faculty.service.ts
│   ├── passwords/password.service.ts
│   ├── program/program.service.ts
│   ├── student/student.service.ts
│   ├── user/user.service.ts
│   ├── requests.service.ts
│   ├── token-interceptor.service.ts
│   ├── dynamic-script-loader.service.ts
│   └── modal-service.service.ts
├── guards/
│   ├── auth.guard.ts               # Role-based route guard
│   └── _admin.guard.ts             # Admin-specific guard
├── customValidators/               # Async email + password match validators
├── global.ts                       # API base URL + SweetAlert config
├── app.module.ts
└── app.routing.ts
```

---

## Routing

### Global Routes
| Path | Component | Guard |
|------|-----------|-------|
| `/` | Redirect → `/login` | — |
| `/login` | LoginComponent | — |
| `/registro` | RegisterComponent | — |
| `/verify/:token` | VerifyComponent | — |
| `/error`, `**` | ErrorComponent | — |

### Admin Routes (`/admin`)
Guard: `_adminGuard` (profile_id=1 or admin=true)

| Path | Component |
|------|-----------|
| `/admin` | AdminHomeComponent (dashboard) |
| `/admin/users` | UsersComponent |
| `/admin/users/add` | UsersAddComponent |
| `/admin/users/:id/edit` | UsersEditComponent |
| `/admin/faculties` | FacultiesComponent |
| `/admin/programs` | ProgramsComponent |
| `/admin/programs/add` | ProgramsAddComponent |
| `/admin/programs/:id/edit` | ProgramsEditComponent |
| `/admin/coordinators` | CoordinatorsHomeComponent |
| `/admin/coordinators/add` | CoordinatorsAddComponent |
| `/admin/coordinators/:id/edit` | CoordinatorsAditComponent |
| `/admin/disabled/:target` | DisabledSectionComponent |

### Student Routes (`/student`)
Guard: `AuthGuard` (profile_id=3)

| Path | Component |
|------|-----------|
| `/student` | HomeStudentComponent |
| `/student/requests` | StudenRequestsComponent |
| `/student/requests/add` | RequestsAddComponent |
| `/student/requests/:id/timeline` | RequestsTimelineComponent |
| `/student/profile` | StudentProfileComponent |

### Coordinator Routes (`/coordinador`)
Guard: `AuthGuard` (profile_id=2)

| Path | Component |
|------|-----------|
| `/coordinador` | CoordinatorHomeComponent |
| `/coordinador/requests/:typeReq` | CoordinatorRequestsComponent |
| `/coordinador/profile` | CoordinatorProfileComponent |

---

## Services (12 total)

| Service | Purpose |
|---------|---------|
| **AuthService** | Login/logout, BehaviorSubject for current user, localStorage persistence |
| **TokenInterceptorService** | HttpInterceptor — adds `Authorization: Bearer` header to all requests |
| **UserService** | Teacher CRUD, email check, count, restore |
| **StudentService** | Student CRUD, student request operations |
| **ProgramService** | Program CRUD, restore, unassigned programs, coordinator lookup |
| **FacultyService** | Faculty CRUD, programs by faculty |
| **CoordinatorService** | Count coordinators, get by program, demote coordinator |
| **AdminService** | Promote teacher to coordinator |
| **RequestsService** | Request CRUD, request types, file upload |
| **PasswordService** | Send reset email, verify token, reset password |
| **ModalServiceService** | Generic modal open/close management |
| **DynamicScriptLoaderService** | Load external JS files (Material Dashboard, jQuery plugins) |

---

## Authentication Flow

1. User submits credentials on `/login`
2. `AuthService.login()` → POST `/api/auth/login`
3. Backend returns `{ access_token, user }`
4. Stored in localStorage as `currentUser`, BehaviorSubject updated
5. Redirect by `profile_id`: 1→`/admin`, 2→`/coordinador`, 3→`/student`
6. `TokenInterceptorService` adds Bearer token to all subsequent requests
7. Route guards check `profile_id` matches required role

---

## Key Models

```typescript
// Profile IDs
enum Profile { admin = 1, coordinator = 2, student = 3, teacher = 4 }

// Request statuses
enum STATUS_TYPE { _open = 'abierta', _onProcess = 'en proceso', _closed = 'cerrada' }

// Request types
enum REQUEST_TYPE { peticion = 1, queja = 2, reclamo = 3 }

// Response statuses
enum RESP_STATUS_TYPE { _open = 1, _onProcess = 2, _closed = 3 }
```

---

## Global Config (`global.ts`)

```typescript
url: 'http://localhost/SIGPQR/SIGPQR-Back-End/public/api/'
contentType: 'application/x-www-form-urlencoded'
```

---

## Build & Run

```bash
npm install
ng serve                # Dev server at http://localhost:4200
ng build --prod         # Production build → dist/SIGPQR-Front-End/
ng test                 # Unit tests (Karma + Jasmine)
ng e2e                  # E2E tests (Protractor)
```

### Size Budgets
- Warning: 2MB
- Error: 5MB
