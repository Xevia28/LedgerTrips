const Booking = require('./../models/bookingModel')
const QR = require('./../models/QR')
const nodemailer = require('nodemailer')
exports.paymentMethod = async (req, res, next) => {
    try {
        res.render("./Payment/paymentType.ejs");
    } catch (error) {
        console.log(error);
    }
};

exports.localPayment = async (req, res, next) => {
    try {
        const QRs = await QR.find();
        res.render("./Payment/localPayment.ejs", { QRs });
    } catch (error) {
        console.log(error);
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const booking = await Booking.find()
        res.status(200).json({ data: booking, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.createBooking = async (req, res) => {
    try {
        const booking = await Booking.create(req.body);
        res.json({ data: booking, status: 'success' });
    } catch (err) {
        console.error('Error sending email:', err);
        res.status(500).json({ error: err.message });
    }
}

exports.getBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        res.json({ data: booking, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.updateBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, req.body);
        res.json({ data: booking, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        res.json({ data: booking, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
