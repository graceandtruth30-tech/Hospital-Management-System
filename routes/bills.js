const express = require('express');
const router = express.Router();
const billController = require('../controllers/billController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.use(authMiddleware);
router.post('/', roleMiddleware('admin','receptionist'), billController.createBill);
router.get('/', roleMiddleware('admin','receptionist','doctor','patient'), billController.getBills);
router.get('/:id', roleMiddleware('admin','receptionist','doctor','patient'), billController.getBillById);
router.put('/:id', roleMiddleware('admin','receptionist'), billController.updateBill);
router.delete('/:id', roleMiddleware('admin'), billController.deleteBill);

module.exports = router;
