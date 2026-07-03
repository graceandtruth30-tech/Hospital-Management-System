const db = require('../models');
const MedicalRecord = db.MedicalRecord;

exports.createRecord = async (req, res) => {
  try {
    const record = await MedicalRecord.create(req.body);
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.findAll();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRecordById = async (req, res) => {
  try {
    const record = await MedicalRecord.findByPk(req.params.id);
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRecord = async (req, res) => {
  try {
    const [updated] = await MedicalRecord.update(req.body, { where: { record_id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Record not found' });
    const record = await MedicalRecord.findByPk(req.params.id);
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    const deleted = await MedicalRecord.destroy({ where: { record_id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Record not found' });
    res.json({ message: 'Record deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
