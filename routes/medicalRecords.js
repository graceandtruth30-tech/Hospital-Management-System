const express = require('express');
const router = express.Router();
const medicalRecordController = require('../controllers/medicalRecordController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.use(authMiddleware);
router.post('/', roleMiddleware('admin','doctor'), medicalRecordController.createRecord);
router.get('/', roleMiddleware('admin','doctor','receptionist','patient'), medicalRecordController.getRecords);
router.get('/:id', roleMiddleware('admin','doctor','patient'), medicalRecordController.getRecordById);
router.put('/:id', roleMiddleware('admin','doctor'), medicalRecordController.updateRecord);
router.delete('/:id', roleMiddleware('admin'), medicalRecordController.deleteRecord);

module.exports = router;
