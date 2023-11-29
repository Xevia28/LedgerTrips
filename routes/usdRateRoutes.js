const express = require('express')
const usdController = require('./../controllers/usdController')
const router = express.Router()

router
    .route('/')
    .get(usdController.getAllUSDs)
    .post(usdController.createUSD)

    router
    .route('/:id')
    .get(usdController.getUSD)
    .patch(usdController.updateUSD)
    .delete(usdController.deleteUSD)

module.exports = router