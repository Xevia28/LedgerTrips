const express = require('express')
const roomTypeController = require('./../controllers/roomTypeController')
const router = express.Router()

router
    .route('/')
    .get(roomTypeController.getAllRoomTypes)
    .post(roomTypeController.uploadRoomPhoto, roomTypeController.createRoomType)

router
    .route('/:id')
    .get(roomTypeController.getRoomType)
    .patch(roomTypeController.uploadRoomPhoto, roomTypeController.updateRoomType)
    .delete(roomTypeController.deleteRoomType)

module.exports = router