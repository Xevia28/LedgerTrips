const mongoose = require('mongoose');

const USD_schema = new mongoose.Schema({
    Rate: {
        type: Number,
        required: true
    }
});

const USDRate = mongoose.model("USDRate", USD_schema);

module.exports = USDRate;