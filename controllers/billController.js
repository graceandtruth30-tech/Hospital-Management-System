const db = require('../models');
const Bill = db.Bill;

exports.createBill = async (req, res) => {
  try {
    const billData = req.body;
    billData.total_amount = parseFloat(billData.consultation_fee || 0) + parseFloat(billData.medication_fee || 0) + parseFloat(billData.laboratory_fee || 0);
    const bill = await Bill.create(billData);
    res.status(201).json(bill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBills = async (req, res) => {
  try {
    const bills = await Bill.findAll();
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBillById = async (req, res) => {
  try {
    const bill = await Bill.findByPk(req.params.id);
    if (!bill) return res.status(404).json({ message: 'Bill not found' });
    res.json(bill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBill = async (req, res) => {
  try {
    const billData = req.body;
    if ('consultation_fee' in billData || 'medication_fee' in billData || 'laboratory_fee' in billData) {
      const current = await Bill.findByPk(req.params.id);
      if (!current) return res.status(404).json({ message: 'Bill not found' });
      billData.total_amount = parseFloat(billData.consultation_fee || current.consultation_fee || 0) + parseFloat(billData.medication_fee || current.medication_fee || 0) + parseFloat(billData.laboratory_fee || current.laboratory_fee || 0);
    }
    const [updated] = await Bill.update(billData, { where: { bill_id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Bill not found' });
    const bill = await Bill.findByPk(req.params.id);
    res.json(bill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBill = async (req, res) => {
  try {
    const deleted = await Bill.destroy({ where: { bill_id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Bill not found' });
    res.json({ message: 'Bill deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
