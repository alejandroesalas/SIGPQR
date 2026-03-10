# SIGPQR Back-End — Init File

## Project Overview

**SIGPQR** (Sistema Integral de Gestión de Peticiones, Quejas y Reclamos) — A RESTful API for managing petitions, complaints, and claims in an academic environment. Students submit requests to their program's coordinator, who reviews and responds.

- **Framework:** Laravel 5.8
- **Language:** PHP 7.1.3+
- **Database:** MySQL
- **Authentication:** JWT (tymon/jwt-auth)
- **Mail:** Postmark (wildbit/swiftmailer-postmark)

---

## Directory Structure

```
SIGPQR-Back-End/
├── app/
│   ├── Http/Controllers/
│   │   ├── AuthController.php          # JWT login/logout/refresh/me
│   │   ├── ApiController.php           # Base controller (traits)
│   │   ├── Auth/                       # Password reset controllers
│   │   ├── Attachment/
│   │   ├── Coordinator/
│   │   │   ├── CoordinatorController.php
│   │   │   └── CoordinatorResponseController.php
│   │   ├── Faculty/
│   │   │   ├── FacultyController.php
│   │   │   └── FacultyProgramController.php
│   │   ├── Profile/ProfileController.php
│   │   ├── Program/
│   │   │   ├── ProgramController.php
│   │   │   └── ProgramRequestController.php
│   │   ├── Request/RequestController.php
│   │   ├── RequestType/
│   │   │   ├── RequestTypeController.php
│   │   │   └── RequestTypeRequestController.php
│   │   ├── Response/ResponseController.php
│   │   ├── Student/
│   │   │   ├── StudentController.php
│   │   │   └── StudentRequestController.php
│   │   └── User/UserController.php
│   ├── Mail/
│   ├── Notifications/
│   ├── Policies/
│   ├── Scopes/
│   ├── Traits/
│   │   ├── ApiResponser.php            # JSON response formatting
│   │   ├── ValitadorTrait.php          # Validation helper
│   │   └── CustomResetsPasswords.php
│   ├── User.php                        # Base user model (JWTSubject)
│   ├── Student.php                     # Extends User
│   ├── Coordinator.php                 # Extends User
│   ├── Faculty.php
│   ├── Program.php
│   ├── Profile.php
│   ├── Request.php                     # PQR entity
│   ├── Response.php                    # Response to PQR
│   ├── RequestType.php
│   ├── Token.php
│   ├── AttachmentRequest.php
│   └── AttachmentResponse.php
├── config/
│   ├── auth.php                        # JWT guard config
│   ├── jwt.php                         # JWT secret/keys
│   ├── database.php
│   └── mail.php
├── database/migrations/                # 11 migration files
├── routes/
│   └── api.php                         # All API route definitions
├── storage/upload/                     # File uploads by student ID
└── composer.json
```

---

## Database Schema

### Tables & Relationships

| Table | Key Fields | Relationships |
|-------|-----------|---------------|
| **users** | id, name, lastname, email, password, id_type (CC/TI), id_num, verified, status, admin, profile_id, program_id | belongsTo(Profile), hasMany(Token) |
| **profiles** | id, name, description | hasMany(User). IDs: 1=Admin, 2=Coordinator, 3=Student, 4=Teacher |
| **faculties** | id, name | hasMany(Program) |
| **programs** | id, name, faculty_id, coordinator_id | belongsTo(Faculty, Coordinator), hasMany(Student, Request) |
| **request_types** | id, type, description | hasMany(Request). Types: petición, queja, reclamo |
| **requests** | id, title, description, status, request_type_id, program_id, student_id | belongsTo(Student, Program, RequestType), hasMany(Response, AttachmentRequest) |
| **responses** | id, title, description, status_response, type, request_id, student_id, coordinator_id | belongsTo(Request), hasMany(AttachmentResponse) |
| **attachment_requests** | id, name, route, extension, request_id | belongsTo(Request) |
| **attachment_responses** | id, name, route, extension, response_id | belongsTo(Response) |
| **tokens** | id, token, email, type, status, user_id | belongsTo(User) — password reset |

All tables use **soft deletes** and timestamps.

---

## API Endpoints

### Authentication (`/api/auth`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | Login → JWT token |
| POST | `/auth/logout` | Invalidate token |
| POST | `/auth/refresh` | Refresh token |
| POST | `/auth/me` | Get current user |

### Password Reset
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/password/email` | Send reset email |
| POST | `/password/reset` | Reset password |

### Users (Teachers)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | List teachers |
| POST | `/users` | Create teacher |
| GET/PUT/DELETE | `/users/{id}` | CRUD teacher |
| PUT | `/ascent-users/{user}` | Promote to coordinator |
| POST | `/check-email` | Validate email uniqueness |
| GET | `/users/verify/{token}` | Email verification |
| GET | `/only-teachers-trashed` | Soft-deleted teachers |
| POST | `/restore-teacher/{id}` | Restore teacher |

### Students
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/students` | List students |
| POST | `/students` | Create student |
| GET/DELETE | `/students/{id}` | Read/delete student |
| GET | `/students/{id}/requests` | Student's requests |
| POST | `/students/{id}/requests` | Create request for student |

### Faculties & Programs
| Method | Endpoint | Description |
|--------|----------|-------------|
| CRUD | `/faculties`, `/programs` | Standard CRUD |
| GET | `/unassigned-programs` | Programs without coordinator |
| GET | `/programs/{id}/students` | Students in program |
| GET | `/programs/{id}/requests` | Requests for program |

### Coordinators
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/coordinators` | List coordinators with programs |
| PUT | `/degradeCoordinator/{id}` | Demote to teacher |

### Requests (PQR)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/requests` | Authenticated student's requests |
| POST | `/requests` | Create request with attachments |
| GET/PUT | `/requests/{id}` | Read/update request |
| POST | `/requests/uploadFiles` | Upload files |

### Responses
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/responses` | Create response (coordinator) |
| PUT | `/responses/{id}` | Update response |

---

## User Roles

| Role | Profile ID | Capabilities |
|------|-----------|-------------|
| Admin | 1 | Full CRUD on all entities, promote/demote users |
| Coordinator | 2 | View program requests, respond to requests |
| Student | 3 | Create/view own requests, upload files |
| Teacher | 4 | Can be promoted to Coordinator |

---

## Key Business Rules

- **Student creation:** unverified, must verify via email token
- **Teacher creation:** auto-verified, password = id_num (hashed)
- **Promotion:** Teacher → Coordinator (assigns program, changes profile_id)
- **Demotion:** Coordinator → Teacher (removes program, changes profile_id)
- **Deleting a program:** auto-demotes its coordinator
- **Request creation:** wraps request + attachments in a DB transaction
- **File storage:** `storage/upload/{student_id_num}/`
- **All models:** use soft deletes (restorable)

---

## Build & Run

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan jwt:secret
php artisan migrate --seed
php artisan serve
# API available at http://localhost:8000/api/
```
