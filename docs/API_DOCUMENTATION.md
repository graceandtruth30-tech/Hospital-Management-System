# Hospital Management System API Documentation

## Authentication

### POST /api/auth/register
Request JSON:
- name
- email
- password
- role

### POST /api/auth/login
Request JSON:
- email
- password

Response JSON:
- token
- user

## Patients
Headers:
- Authorization: Bearer <token>

### POST /api/patients
Create patient record.

### GET /api/patients
List patients.

### GET /api/patients/:id
Get patient details.

### PUT /api/patients/:id
Update patient.

### DELETE /api/patients/:id
Delete patient.

## Doctors
### POST /api/doctors
Create doctor.

### GET /api/doctors
List doctors.

### GET /api/doctors/:id
Get doctor.

### PUT /api/doctors/:id
Update doctor.

### DELETE /api/doctors/:id
Delete doctor.

## Appointments
### POST /api/appointments
Create appointment.

### GET /api/appointments
List appointments.

### GET /api/appointments/:id
Get appointment.

### PUT /api/appointments/:id
Update appointment.

### DELETE /api/appointments/:id
Delete appointment.

## Medical Records
### POST /api/medical-records
Create record.

### GET /api/medical-records
List records.

### GET /api/medical-records/:id
Get record.

### PUT /api/medical-records/:id
Update record.

### DELETE /api/medical-records/:id
Delete record.

## Bills
### POST /api/bills
Create bill.

### GET /api/bills
List bills.

### GET /api/bills/:id
Get bill.

### PUT /api/bills/:id
Update bill.

### DELETE /api/bills/:id
Delete bill.
