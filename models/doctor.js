module.exports = (sequelize, DataTypes) => {
  const Doctor = sequelize.define('Doctor', {
    doctor_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    fullname: { type: DataTypes.STRING, allowNull: false },
    specialization: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    department: { type: DataTypes.STRING }
  }, {
    tableName: 'doctors',
    timestamps: true
  });

  return Doctor;
};
