const mongoose = require('mongoose');

const QR_schema = new mongoose.Schema({
    account_number: {
        type: Number,
        required: true
    },
    QR_pictures: {
        type: String,
        required: true
    }
});

const QR_type = mongoose.model("QR_type", QR_schema);

module.exports = QR_type;
