const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.use(authMiddleware);
router.post('/', roleMiddleware('admin'), doctorController.createDoctor);
router.get('/', roleMiddleware('admin','receptionist','doctor'), doctorController.getDoctors);
router.get('/:id', roleMiddleware('admin','receptionist','doctor'), doctorController.getDoctorById);
router.put('/:id', roleMiddleware('admin'), doctorController.updateDoctor);
router.delete('/:id', roleMiddleware('admin'), doctorController.deleteDoctor);

module.exports = router;
