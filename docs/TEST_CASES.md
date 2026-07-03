# Test Cases

## Authentication
- Register with valid input should create user.
- Login with valid credentials should return JWT.
- Login with invalid password should return 400.

## Patients
- Create patient as receptionist/admin.
- Get all patients as authorized user.
- Update patient by ID.
- Delete patient as admin.

## Doctors
- Create doctor as admin.
- Get all doctors as authorized user.
- Update doctor by ID.
- Delete doctor as admin.

## Appointments
- Create appointment as receptionist/admin.
- Get appointment list.
- Update appointment status.
- Delete appointment as admin.

## Medical Records
- Create record as doctor/admin.
- Get records as patient/doctor.
- Update record as doctor/admin.
- Delete record as admin.

## Bills
- Create bill as receptionist/admin.
- Get bills list.
- Update bill amount and payment status.
- Delete bill as admin.
