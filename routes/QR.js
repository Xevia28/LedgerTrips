const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/QR');

// Route to create a new transaction
router.post('/', transactionController.createTransaction);

// Route to get all transactions
router.get('/', transactionController.getAllTransactions);
router
    .route('/adminBooking')
    .get(transactionController.Booking)
module.exports = router;
