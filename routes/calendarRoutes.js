const express = require('express');
const calendarController = require('./../controllers/calendarController');
const router = express.Router();

router
    .route('/')
    .get(calendarController.calendar)

module.exports = router;
