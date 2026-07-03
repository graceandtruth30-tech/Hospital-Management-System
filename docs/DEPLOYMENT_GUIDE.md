# Deployment Guide

1. Install Node.js and MySQL on the server.
2. Copy project files to the deployment host.
3. Create `.env` from `.env.example` with production credentials.
4. Run `npm install`.
5. Execute `sql/schema.sql` and `sql/seed.sql` in MySQL.
6. Start the app with `npm start` or a process manager like PM2.
7. Configure a reverse proxy (Nginx/Apache) to forward traffic to the Node server.
