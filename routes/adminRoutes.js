const express = require('express')
const adminController = require('./../controllers/adminController')
const router = express.Router()

router.get('/login', adminController.loginPage)

router.post('/register', adminController.signup)
router.post('/signin', adminController.login)
router.get('/logout', adminController.logout)
router.get('/user/logout', adminController.logoutDirectly)
// router.patch('/zhabto/update', adminAuthController.protect, adminAuthController.update)
router
    .route('/')
    .get(adminController.getAllAdmins)

router
    .route('/:id')
    .get(adminController.getAdmin)
    .patch(adminController.updateAdmin)
    .delete(adminController.deleteAdmin)

    module.exports = router