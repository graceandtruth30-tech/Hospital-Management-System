module.exports = (sequelize, DataTypes) => {
  const MedicalRecord = sequelize.define('MedicalRecord', {
    record_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    patient_id: { type: DataTypes.INTEGER, allowNull: false },
    doctor_id: { type: DataTypes.INTEGER, allowNull: false },
    diagnosis: { type: DataTypes.TEXT },
    prescription: { type: DataTypes.TEXT },
    notes: { type: DataTypes.TEXT },
    record_date: { type: DataTypes.DATEONLY }
  }, {
    tableName: 'medical_records',
    timestamps: true
  });

  return MedicalRecord;
};
