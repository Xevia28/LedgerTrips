const { Schema, model } = require('mongoose');

const transactionSchema = new Schema({
    hash: { type: String, required: true, unique: true },
    ledger_index: { type: Number, required: true },
    date: { type: Date, required: true },
    type: { type: String, required: true },
    result: { type: String, required: true },
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    amount: {
        value: { type: String, required: true },
        currency: { type: String, required: true },
    },
});

const TransactionHistory = model('TransactionHistory', transactionSchema);

module.exports = TransactionHistory;
