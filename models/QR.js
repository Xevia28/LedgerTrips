const { Schema, model } = require('mongoose');

const transactionSchema = new Schema({
    hash: {
        type: String,
        required: true,
        unique: true
    },
    ledger_index: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    result: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    transactionID: {
        type: String,
        required: true
    },
});

const TransactionHistory = model('TransactionHistory', transactionSchema);

module.exports = TransactionHistory;
