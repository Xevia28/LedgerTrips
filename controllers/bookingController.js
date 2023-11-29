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

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptionsToCustomer = {
            from: process.env.EMAIL_USER,
            to: booking.email,
            subject: 'You have successfully booked your stay at THE PEMA BY REALM, Thimphu',
            html: `
            <!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Reset Email Button</title>
            
                <style>
                    body {
                        margin: 0 !important;
                        font-family: system-ui, 'Helvetica Neue';
                    }
            
                    .container {
                        width: 100%;
                        max-width: 600px;
                        height: fit-content;
                        margin: auto;
                        background: #333132;
                        color: #fff !important;
                        padding: 2rem;
                        border-radius: 6px;
                    }
            
                    .nav-bar {
                        width: 100%;
                        text-align: center;
                    }
            
                    .hotel-logo {
                        width: 100px;
                        height: 100px;
                        margin: 0 auto;
                    }
            
                    .reservation-data {
                        margin-top: 1.4rem;
                    }
            
                    .reservationID {
                        color: orange;
                    }
            
                    .footer {
                        margin-top: 2rem;
                    }
            
                    table,
                    th,
                    td {
                        border: 1px solid wheat;
                        padding: 5px;
                    }
            
                    table {
                        border: 1px solid wheat;
                        border-collapse: collapse;
                        width: 100%;
                        border-radius: 2px;
                    }
            
                    .reservationNumber {
                        text-align: center;
                        font-size: 15px;
                    }
                </style>
                </style>
            </head>
            
            <body>
            
            
                <div class="container">
                    <div class="nav-bar">
                        <img src="http://139.59.46.216/wp-content/uploads/2022/10/Untitled-1.png" class="hotel-logo" alt="Logo">
                        <br><br>
                        <b class="reservationNumber">RESERVATION NUMBER : ${booking.reservationID}</b>
                        <br><br>
                    </div>
                    <hr width="100%" color="orange">
                    <div class="reservation-data">
                        <p>
                            Booking successful for <b class="reservationID">${booking.reservationID}</b>
                        </p>
            
                        <p>
                            Final confirmation of your reservation shall be sent by email following payment verification.
            
                        </p>
            
                        <p>
                            Thank you very much.
                        </p>
                        <p>
                            Warmly,
                            The Pema by Ream Family
                        </p>
            
                    </div>
                    <div class="footer">
                        <hr width="100%" color="orange">
                        <p>
                            For any queries/clarifications, please feel free to contact our Reservation Executive at the below
                            contact
                            details.
                        </p>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        Reservation Executive
                                    </td>
                                    <td>
                                        Mr. Hem
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Contact Number
                                    </td>
                                    <td>
                                        <p>
                                            <b> +975-17279401 </b> (mobile / whatsapp available)<br>
                                            <b>+975-2-338888</b> (Hotel Reception Desk)
                                        </P>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
            
                </div>
            
            
            </body>
            
            </html>`
        };

        const mailOptionsToManager = {
            from: process.env.EMAIL_USER,
            to: process.env.MANAGER_EMAIL,
            subject: 'New Transacion Processed',
            html: `
            <!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Reset Email Button</title>
            
                <style>
                    body {
                        margin: 0 !important;
                        font-family: system-ui, 'Helvetica Neue';
                    }
            
                    .container {
                        width: 100%;
                        max-width: 600px;
                        height: fit-content;
                        margin: auto;
                        background: #DE9D3B;
                        color: #000;
                        padding: 2rem;
                        border-radius: 6px;
                    }
            
                    .nav-bar {
                        width: 100%;
                        text-align: center;
                    }
            
                    .hotel-logo {
                        width: 100px;
                        height: 100px;
                        margin: 0 auto;
                    }
            
                    .reservation-data {
                        margin-top: 1.4rem;
                    }
            
                    .reservationID {
                        color: orange;
                    }
            
                    .footer {
                        margin-top: 2rem;
                    }
            
                    table,
                    th,
                    td {
                        border: 1px solid wheat;
                        padding: 5px;
                    }
            
                    table {
                        border: 1px solid wheat;
                        border-collapse: collapse;
                        width: 100%;
                        border-radius: 2px;
                    }
            
                    .reservationNumber {
                        text-align: center;
                        font-size: 15px;
                    }
                </style>
                </style>
            </head>
            
            <body>
            
            
                <div class="container">
                    <div class="nav-bar">
                        <img src="http://139.59.46.216/wp-content/uploads/2022/10/Untitled-1.png" class="hotel-logo" alt="Logo">                       
                        <br><br>
                    </div>
                    <hr width="100%" color="orange">
                    <div class="reservation-data">
                        <p>A new transaction has been processed at THE PEMA BY REALM. Here are the details:</p>
                        <p><strong>Reservation ID:</strong> ${booking.reservationID}</p>
                        <p><strong>Customer Name:</strong> ${booking.name}</p>
                        <p><strong>Email:</strong> ${booking.email}</p>
                        <p><strong>Amount:</strong> ${booking.totalAmount}</p>
                        <p>Please review and ensure all necessary steps are taken to confirm and process the transaction.</p>
                        <p>Thank you</p>
                    </div>
                </div>
            </body>
            </html>`
        }

        await transporter.sendMail(mailOptionsToCustomer);
        await transporter.sendMail(mailOptionsToManager);

        console.log('Email sent successfully for reservation ID:', booking.reservationID);



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
