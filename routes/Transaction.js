const express = require('express');
const TransactionController = require('./../controllers/Transaction');
const router = express.Router();


router.route('/').get(TransactionController.getTransaction)
router.route('/:id').patch(TransactionController.updateBooking)
router.route('/:id').delete(TransactionController.deleteTransaction)

module.exports = router;
