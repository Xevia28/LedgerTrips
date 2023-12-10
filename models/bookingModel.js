const mongoose = require('mongoose')
const validator = require('validator')

const bookingSchema = new mongoose.Schema({
    reservationID:{
        type:String,
        required:[true, "Please provide reservation ID!"]
    },
    name: {
        type: String,
        required:[true, "Please enter your name!"]
    },
    email: {
        type:String,
        required: [true, 'Please provide your email'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    contactNumber: {
        type:String,
        required:[true, "Please enter your contact number!"],
    },
    specialRequirement: {
        type: String,
        default:"None"
    },
    roomType: {
        type:String,
        required:[true, "Please enter the room type!"]
    },
    checkinDate: {
        type: Date,
        required:[true, "Please enter check in date!"]
    },
    checkoutDate: {
        type: Date,
        required:[true, "Please enter check out date!"]
    },
    adultNumber: {
        type: Number,
        required:[true, "Please enter the number of adults!"]
    },
    childMinorNumber: {
        type: Number,
        required:[true, "Please enter the number of minor child!"]
    },
    childNumber: {
        type: Number,
        required: [true, "Please enter the number of child!"]
    },
    totalRooms:{
        type:String,
        required:[true, "Please provide the total rooms!"]
    },
    totalRoomTypes:{
        type:String,
        required:[true, "Please provide the total room with types!"]
    },
    totalAmount:{
        type:String,
        required:[true, "Please provide the total amount!"]
    },
    transactionID:{
        type:String,
        default:'000000'
    },
    transactionVerification:{
        type: Boolean,
        default:true,
    }
})

const Booking = mongoose.model('Booking', bookingSchema)
module.exports = Booking