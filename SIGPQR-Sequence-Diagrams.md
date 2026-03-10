# SIGPQR — Sequence Diagrams

All diagrams use Mermaid syntax. Render with any Mermaid-compatible viewer (VS Code extension, GitHub, mermaid.live, etc.).

---

## 1. Student Registration & Email Verification

```mermaid
sequenceDiagram
    actor S as Student (Browser)
    participant FE as Angular FE
    participant BE as Laravel API
    participant DB as MySQL
    participant Mail as Postmark Mail

    S->>FE: Fill registration form (/registro)
    FE->>FE: Validate fields (name, email, password, program)
    FE->>BE: POST /api/check-email {email}
    BE->>DB: SELECT * FROM users WHERE email = ?
    DB-->>BE: Result
    BE-->>FE: {available: true/false}
    FE->>FE: Async email validator resolves

    S->>FE: Submit form
    FE->>BE: POST /api/students {name, lastname, email, password, id_type, id_num, program_id}
    BE->>DB: INSERT INTO users (profile_id=3, verified=0, verification_token=generated)
    DB-->>BE: Student created
    BE->>Mail: Send verification email with token link
    Mail-->>S: Email with /verify/{token} link
    BE-->>FE: 201 {data: student}
    FE->>FE: Show success alert (SweetAlert2)

    S->>FE: Click verification link → /verify/{token}
    FE->>BE: GET /api/users/verify/{token}
    BE->>DB: UPDATE users SET verified=1 WHERE verification_token = ?
    DB-->>BE: Updated
    BE-->>FE: 200 {message: "verified"}
    FE->>FE: Redirect to /login
```

---

## 2. Login & JWT Authentication

```mermaid
sequenceDiagram
    actor U as User (Browser)
    participant FE as Angular FE
    participant Auth as AuthService
    participant Int as TokenInterceptor
    participant BE as Laravel API
    participant JWT as JWT Auth
    participant DB as MySQL

    U->>FE: Enter email & password on /login
    FE->>Auth: login(email, password)
    Auth->>BE: POST /api/auth/login {email, password}
    BE->>DB: SELECT * FROM users WHERE email = ?
    DB-->>BE: User record
    BE->>BE: Verify password hash
    BE->>BE: Check verified == 1
    BE->>JWT: Generate JWT token
    JWT-->>BE: access_token
    BE-->>Auth: {access_token, token_type, expires_in, user}
    Auth->>Auth: localStorage.setItem('currentUser', user + token)
    Auth->>Auth: currentUserSubject.next(user)
    Auth-->>FE: Login success

    alt profile_id == 1
        FE->>FE: router.navigate(['/admin'])
    else profile_id == 2
        FE->>FE: router.navigate(['/coordinador'])
    else profile_id == 3
        FE->>FE: router.navigate(['/student'])
    end

    Note over FE,Int: All subsequent HTTP requests
    FE->>Int: HTTP request
    Int->>Int: Get token from AuthService.currentUserValue
    Int->>BE: Request + Header: Authorization: Bearer {token}
    BE->>JWT: Validate token
    JWT-->>BE: Valid / user_id
    BE-->>FE: Protected resource response
```

---

## 3. Student Creates a PQR (Request)

```mermaid
sequenceDiagram
    actor S as Student
    participant FE as RequestsAddComponent
    participant RS as RequestsService
    participant SS as StudentService
    participant BE as Laravel API
    participant DB as MySQL
    participant FS as File System

    S->>FE: Navigate to /student/requests/add
    FE->>RS: getRequestTypes()
    RS->>BE: GET /api/request-types
    BE->>DB: SELECT * FROM request_types
    DB-->>BE: [petición, queja, reclamo]
    BE-->>FE: Request types list

    S->>FE: Fill form (title, description via CKEditor, type, attachments)

    opt File Upload
        S->>FE: Select files (.jpg, .png, .pdf, .docx)
        FE->>BE: POST /api/requests/uploadFiles {files}
        BE->>FS: Store in storage/upload/{id_num}/
        FS-->>BE: File paths
        BE-->>FE: Attachment metadata [{name, route, extension}]
    end

    S->>FE: Submit request
    FE->>RS: storeRequest(requestData)
    RS->>BE: POST /api/requests {title, description, status, request_type_id, program_id, student_id, attachments[]}
    BE->>BE: Validate fields
    BE->>DB: BEGIN TRANSACTION
    BE->>DB: INSERT INTO requests (...)
    DB-->>BE: request_id

    loop For each attachment
        BE->>DB: INSERT INTO attachment_requests (request_id, name, route, extension)
    end

    BE->>DB: COMMIT
    DB-->>BE: Success
    BE-->>RS: 201 {data: request}
    RS-->>FE: Request created
    FE->>FE: SweetAlert success → redirect to /student/requests
```

---

## 4. Coordinator Reviews & Responds to a Request

```mermaid
sequenceDiagram
    actor C as Coordinator
    participant FE as CoordinatorRequestsComponent
    participant RS as RequestsService
    participant BE as Laravel API
    participant DB as MySQL

    C->>FE: Navigate to /coordinador/requests/{typeReq}
    FE->>RS: getRequestByType(typeReq)
    RS->>BE: GET /api/request-types/{typeReq}/requests
    BE->>DB: SELECT requests WHERE request_type_id = ? AND program_id = coordinator's program
    DB-->>BE: Requests list
    BE-->>FE: [{id, title, status, student, created_at, ...}]

    C->>FE: Select a request to view details
    FE->>RS: getRequestById(requestId)
    RS->>BE: GET /api/requests/{id}
    BE->>DB: SELECT request WITH responses, attachments
    DB-->>BE: Request + responses + attachments
    BE-->>FE: Full request detail

    C->>FE: Write response (title, description, status)
    FE->>BE: POST /api/responses {request_id, title, description, coordinator_id, student_id, status_response, type, attachments[]}
    BE->>BE: Validate fields
    BE->>DB: BEGIN TRANSACTION
    BE->>DB: INSERT INTO responses (...)
    DB-->>BE: response_id

    loop For each attachment
        BE->>DB: INSERT INTO attachment_responses (response_id, name, route, extension)
    end

    BE->>DB: COMMIT
    DB-->>BE: Success
    BE-->>FE: 201 {data: response}
    FE->>FE: Update view with new response
```

---

## 5. Student Views Request Timeline

```mermaid
sequenceDiagram
    actor S as Student
    participant FE as RequestsTimelineComponent
    participant SS as StudentService
    participant BE as Laravel API
    participant DB as MySQL

    S->>FE: Navigate to /student/requests/{id}/timeline
    FE->>SS: getCurrentRequest(studentId, requestId)
    SS->>BE: POST /api/students/{studentId}/requests/{requestId}
    BE->>DB: SELECT request WHERE id = ? AND student_id = ?
    BE->>DB: SELECT responses WHERE request_id = ? WITH attachments
    BE->>DB: SELECT attachment_requests WHERE request_id = ?
    DB-->>BE: Request + responses[] + attachments[]
    BE-->>FE: {request, responses[], attachments[]}

    FE->>FE: Render timeline view
    Note over FE: Shows request details at top
    Note over FE: Lists responses chronologically
    Note over FE: Shows attachments for each entry
    Note over FE: Displays status: abierta → en proceso → cerrada
```

---

## 6. Admin Promotes Teacher to Coordinator

```mermaid
sequenceDiagram
    actor A as Admin
    participant FE as UsersComponent
    participant AS as AdminService
    participant PS as ProgramService
    participant BE as Laravel API
    participant DB as MySQL

    A->>FE: Navigate to /admin/users
    FE->>BE: GET /api/users
    BE->>DB: SELECT users WHERE profile_id = 4 (teacher)
    DB-->>BE: Teachers list
    BE-->>FE: [{id, name, email, ...}]

    A->>FE: Click "Promote" on a teacher
    FE->>PS: unassignedPrograms()
    PS->>BE: GET /api/unassigned-programs
    BE->>DB: SELECT programs WHERE coordinator_id IS NULL
    DB-->>BE: Available programs
    BE-->>FE: Programs without coordinator

    FE->>FE: Show modal: select program to assign
    A->>FE: Select program → confirm

    FE->>AS: promoverDocente(userId, programId)
    AS->>BE: PUT /api/ascent-users/{userId} {program_id}
    BE->>DB: UPDATE users SET profile_id=2, status='active' WHERE id = ?
    BE->>DB: UPDATE programs SET coordinator_id = ? WHERE id = ?
    DB-->>BE: Updated
    BE-->>FE: 200 {data: user}
    FE->>FE: SweetAlert success → refresh list
```

---

## 7. Admin Demotes Coordinator to Teacher

```mermaid
sequenceDiagram
    actor A as Admin
    participant FE as CoordinatorsAditComponent
    participant CS as CoordinatorService
    participant BE as Laravel API
    participant DB as MySQL

    A->>FE: Navigate to /admin/coordinators/{id}/edit
    FE->>BE: GET /api/programs/{programId}/coordinators
    BE-->>FE: Coordinator details

    A->>FE: Click "Demote"
    FE->>CS: degradeUser(coordinatorId)
    CS->>BE: PUT /api/degradeCoordinator/{id}
    BE->>DB: UPDATE users SET profile_id=4 WHERE id = ?
    BE->>DB: UPDATE programs SET coordinator_id = NULL WHERE coordinator_id = ?
    DB-->>BE: Updated
    BE-->>FE: 200 {data: user}
    FE->>FE: Redirect to /admin/coordinators
```

---

## 8. Password Reset Flow

```mermaid
sequenceDiagram
    actor U as User
    participant FE as ForgotPasswordComponent
    participant PS as PasswordService
    participant BE as Laravel API
    participant DB as MySQL
    participant Mail as Postmark Mail

    U->>FE: Click "Forgot Password" on login page
    FE->>FE: Open modal
    U->>FE: Enter email
    FE->>PS: senEmailReset(email)
    PS->>BE: POST /api/password/email {email}
    BE->>DB: SELECT user WHERE email = ?
    DB-->>BE: User found
    BE->>DB: INSERT INTO tokens (token, email, user_id, type='reset')
    BE->>Mail: Send reset email with token
    Mail-->>U: Email with reset link
    BE-->>FE: 200 {message: "email sent"}

    U->>FE: Click reset link
    FE->>PS: verifyResetToken(token)
    PS->>BE: POST /api/password/reset {token, email, password, password_confirmation}
    BE->>DB: SELECT token WHERE token = ? AND email = ?
    BE->>DB: UPDATE users SET password = ? WHERE email = ?
    BE->>DB: DELETE token
    DB-->>BE: Updated
    BE-->>FE: 200 {message: "password reset"}
    FE->>FE: Redirect to /login
```

---

## 9. Full PQR Lifecycle (End-to-End)

```mermaid
sequenceDiagram
    actor S as Student
    actor C as Coordinator
    participant FE as Angular App
    participant BE as Laravel API
    participant DB as MySQL

    Note over S,DB: Phase 1 — Student creates PQR

    S->>FE: Login → /student
    S->>FE: Navigate to /student/requests/add
    S->>FE: Fill PQR form + upload attachments
    FE->>BE: POST /api/requests/uploadFiles
    BE-->>FE: Attachment metadata
    FE->>BE: POST /api/requests {title, desc, type, attachments}
    BE->>DB: INSERT request + attachments (transaction)
    DB-->>BE: Created (status: "abierta")
    BE-->>FE: 201 Created

    Note over S,DB: Phase 2 — Coordinator reviews & responds

    C->>FE: Login → /coordinador
    C->>FE: Navigate to /coordinador/requests/1 (peticiones)
    FE->>BE: GET /api/request-types/1/requests
    BE-->>FE: List of peticiones for coordinator's program
    C->>FE: Open request → view details
    FE->>BE: GET /api/requests/{id}
    BE-->>FE: Request + existing responses

    C->>FE: Write response
    FE->>BE: POST /api/responses {request_id, title, desc, status_response=2}
    BE->>DB: INSERT response (transaction)
    DB-->>BE: Created
    Note over DB: Request status → "en proceso"
    BE-->>FE: 201 Created

    Note over S,DB: Phase 3 — Student views response

    S->>FE: Navigate to /student/requests/{id}/timeline
    FE->>BE: GET student request with responses
    BE-->>FE: Request + responses timeline
    S->>FE: Views coordinator's response

    Note over S,DB: Phase 4 — Coordinator closes request

    C->>FE: Write final response
    FE->>BE: POST /api/responses {request_id, status_response=3}
    BE->>DB: INSERT response
    Note over DB: Request status → "cerrada"
    BE-->>FE: 201 Created
```

---

## 10. Admin Dashboard Data Loading

```mermaid
sequenceDiagram
    actor A as Admin
    participant FE as AdminHomeComponent
    participant BE as Laravel API
    participant DB as MySQL

    A->>FE: Login → /admin

    par Parallel API calls
        FE->>BE: GET /api/count-faculties
        BE->>DB: SELECT COUNT(*) FROM faculties
        DB-->>BE: count
        BE-->>FE: {data: count}
    and
        FE->>BE: GET /api/count-programs
        BE->>DB: SELECT COUNT(*) FROM programs
        DB-->>BE: count
        BE-->>FE: {data: count}
    and
        FE->>BE: GET /api/count-teachers
        BE->>DB: SELECT COUNT(*) FROM users WHERE profile_id=4
        DB-->>BE: count
        BE-->>FE: {data: count}
    and
        FE->>BE: GET /api/count-coordinators
        BE->>DB: SELECT COUNT(*) FROM users WHERE profile_id=2
        DB-->>BE: count
        BE-->>FE: {data: count}
    and
        FE->>BE: GET /api/count-students
        BE->>DB: SELECT COUNT(*) FROM users WHERE profile_id=3
        DB-->>BE: count
        BE-->>FE: {data: count}
    end

    FE->>FE: Render dashboard cards with statistics
```
