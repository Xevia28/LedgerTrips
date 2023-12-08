const TransactionHistory = require('../models/QR');

exports.Booking = async (req, res, next) => {
    try {
        res.render("./Dashboard/adminBooking.ejs");
    } catch (error) {
        console.log(error);
    }
};
// Controller to create a new transaction
exports.createTransaction = async (req, res) => {
    try {
        const newTransaction = await TransactionHistory.create(req.body);
        res.status(201).json({ status: 'success', data: newTransaction });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Controller to get all transactions
exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await TransactionHistory.find();
        res.json({ status: 'success', data: transactions });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
