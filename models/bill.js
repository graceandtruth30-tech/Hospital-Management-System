module.exports = (sequelize, DataTypes) => {
  const Bill = sequelize.define('Bill', {
    bill_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    patient_id: { type: DataTypes.INTEGER, allowNull: false },
    consultation_fee: { type: DataTypes.DECIMAL(10,2), defaultValue: 0 },
    medication_fee: { type: DataTypes.DECIMAL(10,2), defaultValue: 0 },
    laboratory_fee: { type: DataTypes.DECIMAL(10,2), defaultValue: 0 },
    total_amount: { type: DataTypes.DECIMAL(10,2), defaultValue: 0 },
    payment_status: { type: DataTypes.ENUM('pending','paid','partial'), defaultValue: 'pending' }
  }, {
    tableName: 'bills',
    timestamps: true
  });

  return Bill;
};
