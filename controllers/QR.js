const TransactionHistory = require('../models/QR');

exports.getTransaction = async (req, res) => {
    try {
        const transactions = await TransactionHistory.find();
        res.render('./Dashboard/transaction.ejs', { transactions: transactions });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.delteTransaction = async (req, res) => {
    try {
        const transactions = await TransactionHistory.findByIdAndDelete(req.params.id);
        res.json({ data: transactions, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
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
