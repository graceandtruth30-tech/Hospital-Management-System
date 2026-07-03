module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
    patient_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    fullname: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.ENUM('Male','Female','Other') },
    dob: { type: DataTypes.DATEONLY },
    phone: { type: DataTypes.STRING },
    address: { type: DataTypes.TEXT },
    blood_group: { type: DataTypes.STRING },
    emergency_contact: { type: DataTypes.STRING }
  }, {
    tableName: 'patients',
    timestamps: true
  });

  return Patient;
};
