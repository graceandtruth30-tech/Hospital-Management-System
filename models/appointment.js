module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    appointment_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    patient_id: { type: DataTypes.INTEGER, allowNull: false },
    doctor_id: { type: DataTypes.INTEGER, allowNull: false },
    appointment_date: { type: DataTypes.DATEONLY },
    appointment_time: { type: DataTypes.TIME },
    status: { type: DataTypes.ENUM('scheduled','completed','cancelled'), defaultValue: 'scheduled' }
  }, {
    tableName: 'appointments',
    timestamps: true
  });

  return Appointment;
};
