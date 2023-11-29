const USDRate = require('./../models/USDRate')
const QR_type = require("../models/QR.js");

exports.getAllUSDs = async (req, res) => {
    try {
        const usd = await USDRate.find()
        res.status(200).json({ data: usd, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.createUSD = async (req, res) => {
    try {
        const usd = await USDRate.create(req.body);
        res.json({ data: usd, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getUSD = async (req, res) => {
    try {
        const usd = await USDRate.findById(req.params.id);
        res.json({ data: usd, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
exports.updateUSD = async (req, res) => {
    try {
        const { Rate } = req.body;
        const usd = await USDRate.findByIdAndUpdate(req.params.id, { Rate }, { new: true });


        const QR_typee = await QR_type.find();
        const USD_Rate = await USDRate.find();

        res.render('./Dashboard/QR.ejs', {
            'QR_typee': QR_typee,
            'USD_Rate': USD_Rate,
            "status":"Dollar Rate Updated Successfully"
        });

        // res.redirect('/api/QR');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.deleteUSD = async (req, res) => {
    try {
        const usd = await USDRate.findByIdAndDelete(req.params.id);
        res.json({ data: usd, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
