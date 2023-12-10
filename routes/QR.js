const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/QR');

router.get('/', transactionController.getTransaction);
router.delete('/:id', transactionController.delteTransaction);
// Route to create a new transaction
router.post('/', transactionController.createTransaction);
// Route to get all transactions
router.get('/', transactionController.getAllTransactions);
router
    .route('/adminBooking')
    .get(transactionController.Booking)
module.exports = router;
