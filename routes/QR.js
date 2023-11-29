const express = require('express');
const QRController = require('./../controllers/QR');
const router = express.Router();
const multer = require("multer");
const crypto = require('crypto');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file);
        cb(null, "public/images/QR");
    },
    filename: (req, file, cb) => {
        const randomString = crypto.randomBytes(6).toString("hex");
        const uniqueSuffix = Date.now() + "-" + randomString;
        cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.originalname.split(".").pop());
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
});

router.route('/QRR').get(QRController.Qrr)
router.route('/editQRR/:id').get(QRController.editQR)

router
    .route('/')
    .get(QRController.QR)
    .post(upload.single('QR_pictures'), QRController.addQR);

router
    .route('/:id')
    .patch(upload.single('QR_pictures'), QRController.posteditQR)
    .delete(QRController.deleteQR);
router
    .route('/adminBooking')
    .get(QRController.Booking)

module.exports = router;
