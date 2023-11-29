const express = require('express')
const customBookingController = require('./../controllers/customBookingController')
const router = express.Router()

router
    .route('/')
    .get(customBookingController.getAllCustomBooking)
    .post(customBookingController.createCustomBooking)

router
    .route('/:id')
    .get(customBookingController.getCustomBooking)
    .patch(customBookingController.updateCustomBooking)
    .delete(customBookingController.deleteCustomBooking)

module.exports = router