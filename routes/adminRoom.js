const express = require('express');
const roomController = require('./../controllers/adminRoom');
const router = express.Router();

router
    .route('/')
    .get(roomController.AllRoom)

router
    .route('/rooms')
    .get(roomController.AddRoom)

router
    .route('/update')
    .get(roomController.UpdateRoom)


router
    .route('/bookedrooms')
    .get(roomController.Booking)

module.exports = router