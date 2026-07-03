const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.User = require('./user')(sequelize, Sequelize.DataTypes);
db.Patient = require('./patient')(sequelize, Sequelize.DataTypes);
db.Doctor = require('./doctor')(sequelize, Sequelize.DataTypes);
db.Appointment = require('./appointment')(sequelize, Sequelize.DataTypes);
db.MedicalRecord = require('./medicalRecord')(sequelize, Sequelize.DataTypes);
db.Bill = require('./bill')(sequelize, Sequelize.DataTypes);

// Associations
db.Patient.hasMany(db.Appointment, { foreignKey: 'patient_id' });
db.Doctor.hasMany(db.Appointment, { foreignKey: 'doctor_id' });

db.Patient.hasMany(db.MedicalRecord, { foreignKey: 'patient_id' });
db.Doctor.hasMany(db.MedicalRecord, { foreignKey: 'doctor_id' });

module.exports = db;
