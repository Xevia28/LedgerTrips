const mongoose = require('mongoose')

const roomTypeSchema = new mongoose.Schema({
       name: {
        type: String,
        required: [true, "Please enter room name!"]
    },
    photo: {
        type: String,
        required: [true, "Image is required!"]
    },
    singlePrice: {
        type: Number,
        required: [true, "Please enter price for single!"]
    },
    doublePrice: {
        type: Number,
        required: [true, "Please enter the price for double!"]
    },
    triplePrice: {
        type: Number,
        required: [true, "Please enter the price for triple!"]
    },
    numberOfRooms: {
        type: Number,
        required: [true, "Please enter the number of rooms!"]
    },
    childRate: {
        type: Number,
        required: [true, "Please enter the child rate!"]
    },
    taxRate: {
        type: Number,
        required: [true, "Please enter the tax rate!"]
    },
    description: {
        type: String,
        required: [true, "Please provide a brief description!"]
    }
})

const RoomType = mongoose.model('RoomType', roomTypeSchema)
module.exports = RoomType