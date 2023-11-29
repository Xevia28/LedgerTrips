const QR_type = require("../models/QR.js");
const fs = require('fs');
const USDRate = require('./../models/USDRate')

exports.QR = async (req, res, next) => {
    try {
        const QR_typee = await QR_type.find();
        const USD_Rate = await USDRate.find();

        res.render('./Dashboard/QR.ejs', {
            'QR_typee': QR_typee,
            'USD_Rate': USD_Rate,
            "status": "None"
        });
    } catch (error) {
        console.log(error);
    }
};

exports.Booking = async (req, res, next) => {
    try {
        res.render("./Dashboard/adminBooking.ejs");
    } catch (error) {
        console.log(error);
    }
};

exports.Qrr = async (req, res, next) => {
    try {
        const QR_types = await QR_type.find();

        res.render('./Dashboard/addQR', { QR_types ,status:"None"});
    } catch (error) {
        console.log(error);
    }
};

exports.addQR = async (req, res, next) => {
    try {
        const image = req.file.filename;
        const newRoom_type = new QR_type({
            account_number: req.body.account_number,
            QR_pictures: image
        });
        await newRoom_type.save();

        res.render('./Dashboard/addQR.ejs', {
            "status": "QR Added Successfully"
        });

    } catch (err) {
        next(err);
    }
};

exports.DeleteQR = async (req, res) => {
    try {
        const foundItem = await QR_type.findByIdAndDelete(req.params.id);
        res.json({ data: foundItem, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.deleteQR = async (req, res, next) => {
    try {
        const foundItem = await QR_type.findByIdAndDelete(req.params.id);
        const path = "public/images/QR/" + foundItem.QR_pictures;

        fs.unlink(path, (err) => {
            if (err) {
                console.error(err);
            }
            console.log("File removed");
        });
        const QR_typee = await QR_type.find();
        const USD_Rate = await USDRate.find();

        res.render('./Dashboard/QR.ejs', {
            'QR_typee': QR_typee,
            'USD_Rate': USD_Rate,
            "status": "QR Deleted Successfully"
        });
    } catch (err) {
        next(err);
    }
};

exports.editQR = async (req, res, next) => {
    try {
        const update = await QR_type.findById(req.params.id);
        res.render('./Dashboard/updateQR.ejs', { update: update, status: "None" });
    } catch (err) {
        next(err);
    }
};

exports.posteditQR = async (req, res, next) => {
    try {
        const { account_number } = req.body;

        if (req.file) {
            const QR_pictures = req.file.filename;
            const update = await QR_type.findByIdAndUpdate(req.params.id, { account_number, QR_pictures });
            const path = "public/images/QR/" + update.QR_pictures;

            fs.unlink(path, (err) => {
                if (err) {
                    console.error(err);
                }
                console.log("File removed");
            });

            console.log(update);
        } else {
            const update = await QR_type.findByIdAndUpdate(req.params.id, { account_number });
            const QR = await QR_type.findById(req.params.id);
            res.render('./Dashboard/updateQR.ejs', { update: QR, status: "QR Updated Successfully" });
        }

        // res.redirect('/api/QR');
    } catch (err) {
        next(err);
    }
};

