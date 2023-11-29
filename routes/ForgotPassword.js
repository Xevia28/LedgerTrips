const express = require('express');
const ForgotPassword = require('./../controllers/ForgotPassword');
const router = express.Router();

router.post('/forgot-password', ForgotPassword.forgotPassword)
router.get('/reset-password/:id/:token', ForgotPassword.resetPassword);
router.post('/reset-password/:id/:token', ForgotPassword.updatePassword);

router
    .route('/')
    .get(ForgotPassword.RenderforgotPassword)


module.exports = router