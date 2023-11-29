const mongoose = require('mongoose')
const validator = require('validator')

const customBookingSchema = new mongoose.Schema({
    startDate: {
        type: Date,
        required: [true, "Please provide a start date!"]
    },
    endDate: {
        type: Date,
        required: [true, "Please provide a end date!"]
    },
    roomType: {
        type: String,
        required: [true, "Please provide a room type"]
    },
    adultNumber: {
        type: String,
        required: [true, "Please provide the number of adults!"]
    },
    rooms: {
        type: Number,
        required: [true, 'Please provide number of rooms!'],

    },
    price: {
        type: Number,
        required: [true, "Please enter a price!"],
    },
})

const customBooking = mongoose.model('customBooking', customBookingSchema)
module.exports = customBooking