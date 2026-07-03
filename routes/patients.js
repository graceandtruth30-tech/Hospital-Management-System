const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.use(authMiddleware);
router.post('/', roleMiddleware('admin','receptionist'), patientController.createPatient);
router.get('/', roleMiddleware('admin','receptionist','doctor'), patientController.getPatients);
router.get('/:id', roleMiddleware('admin','receptionist','doctor'), patientController.getPatientById);
router.put('/:id', roleMiddleware('admin','receptionist'), patientController.updatePatient);
router.delete('/:id', roleMiddleware('admin'), patientController.deletePatient);

module.exports = router;
