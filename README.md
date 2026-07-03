# Hospital Management System - Backend

## Setup
1. Copy `.env.example` to `.env` and fill database credentials.
2. Run `npm install` to install dependencies.
3. Execute `sql/schema.sql` and `sql/seed.sql` in MySQL.
4. Start server: `npm run dev` or `npm start`.

## Frontend
- Public UI is served from `backend/public`.
- Use `index.html` to login/register.
- After login, the dashboard is available at `/dashboard.html`.

## API
- Authentication: `/api/auth/register`, `/api/auth/login`
- Patients: `/api/patients`
- Doctors: `/api/doctors`
- Appointments: `/api/appointments`
- Medical records: `/api/medical-records`
- Bills: `/api/bills`

## Notes
- Uses Sequelize for models.
- Authentication and RBAC enabled via JWT.
- See `docs/API_DOCUMENTATION.md` for endpoint details.

"# Hospital-Management-System" 
