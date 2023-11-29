const express = require('express')
const bookingController = require('./../controllers/bookingController')
const router = express.Router()

router.route('/payment').get(bookingController.paymentMethod)

router.route('/paymentpage').get(bookingController.localPayment)
router
    .route('/')
    .get(bookingController.getAllBookings)
    .post(bookingController.createBooking)

    router
    .route('/:id')
    .get(bookingController.getBooking)
    .patch(bookingController.updateBooking)
    .delete(bookingController.deleteBooking)

module.exports = router