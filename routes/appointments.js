const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.use(authMiddleware);
router.post('/', roleMiddleware('admin','receptionist'), appointmentController.createAppointment);
router.get('/', roleMiddleware('admin','receptionist','doctor','patient'), appointmentController.getAppointments);
router.get('/:id', roleMiddleware('admin','receptionist','doctor','patient'), appointmentController.getAppointmentById);
router.put('/:id', roleMiddleware('admin','receptionist'), appointmentController.updateAppointment);
router.delete('/:id', roleMiddleware('admin'), appointmentController.deleteAppointment);

module.exports = router;
