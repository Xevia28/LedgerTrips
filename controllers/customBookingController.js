const customBooking = require("./../models/customBookingModel")

exports.getAllCustomBooking = async (req, res) => {
    try {
        const custom_booking = await customBooking.find()
        res.status(200).json({ data: custom_booking, status: "success" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.createCustomBooking = async (req, res) => {
    try {
        const custom_booking = await customBooking.create(req.body);
        res.json({ data: custom_booking, status: "success" })


    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}

exports.getCustomBooking = async (req, res) => {
    try {
        const custom_booking = await customBooking.findById(req.params.id);
        res.json({ data: custom_booking, status: 'success' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.updateCustomBooking = async (req, res) => {
    try {
        const custom_booking = await customBooking.findByIdAndUpdate(req.params.id, req.body);
        res.json({ data: custom_booking, status: "success" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.deleteCustomBooking = async (req, res) => {
    try {
        const custom_booking = await customBooking.findByIdAndDelete(req.params.id);
        res.json({ data: custom_booking, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}