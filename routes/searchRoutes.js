const express = require('express')
const searchController = require('../controllers/roomTypeController')
const router = express.Router()

router
    .route('/')
    .get(searchController.Homepage)
router
    .route('/roomtypes')
    .get(searchController.RoomPage)

router
    .route('/deluxeRoom')
    .get(searchController.RoomDetailPage)

router
    .route('/comfortSuite')
    .get(searchController.RoomPema)

router
    .route('/valleySuite')
    .get(searchController.RoomValley)

router
    .route('/checkSearch')
    .post(searchController.NewSearch)

module.exports = router