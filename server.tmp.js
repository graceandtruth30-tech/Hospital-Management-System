require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => res.json({ message: 'Hospital Management System API' }));

// Routes
const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patients');
const doctorRoutes = require('./routes/doctors');
const appointmentRoutes = require('./routes/appointments');
const recordRoutes = require('./routes/medicalRecords');
const billRoutes = require('./routes/bills');

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/medical-records', recordRoutes);
app.use('/api/bills', billRoutes);

const PORT = process.env.PORT || 3000;

db.authenticate()
  .then(() => {
    console.log('Database connected.');
    return db.sync();
  })
  .then(() => {
    console.log('Database synchronized.');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Unable to connect to DB:', err);
  });
