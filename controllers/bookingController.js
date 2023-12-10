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

        const checkin = booking.checkinDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
        const checkout = booking.checkoutDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

        const checkedId = new Date(booking.checkinDate);
        const checkouted = new Date(booking.checkoutDate);
        const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
        const diffInDays = Math.round(Math.abs((checkouted.getTime() - checkedId.getTime()) / oneDay));

        const mailOptions = {
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
                        max-width: 700px;
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
                        text-align: justify;
                    }
            
                    .reservationID {
                        color: orange;
                    }
            
                    .footer {
                        margin-top: 1rem;
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
                        font-size: 18px;
                    }
                </style>
                </style>
            </head>
            
            <body>
            
            
                <div class="container">
                             
                    <div class="reservation-data">
                        <p>
                            Dear ${booking.name} & Group,
                        </p>
            
                        <p>
                            We are pleased to confirm your reservation with The Pema by Realm, Thimphu. Here is a summary of your
                            booking and information. We look forward to welcoming you and making your stay a memorable one.
                        </p>
                        <br>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <b>Guest Name</b>
                                    </td>
                                    <td>
                                        ${booking.name}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Email ID
                                    </td>
                                    <td>
                                        ${booking.email}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Telephone No
                                    </td>
                                    <td>
                                        ${booking.contactNumber}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Check In Date
                                    </td>
                                    <td>
                                        ${checkin} &nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;14.00
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Check Out Date
                                    </td>
                                    <td>
                                        ${checkout} &nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;14.00
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>
                                            Confirmation Number
                                        </b>
                                    </td>
                                    <td>
                                        <b>
                                            ${booking.reservationID}
                                        </b>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>
                                            Reservation Status
                                        </b>
                                    </td>
                                    <td>
                                        <b>
                                            Confirmed
                                        </b>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <br>
            
                        <p><b>Room and Rate Information</b></p>
                        <table>
                            <tbody>
            
                                <tr>
                                    <td>
                                        Room Rate
                                    </td>
                                    <td>
                                        ${booking.totalAmount}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Room Type
                                    </td>
                                    <td>
                                        ${booking.roomType}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        No of Room Nights
                                    </td>
                                    <td>
                                        ${booking.totalRooms} Room ${diffInDays} Nights
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Pax (Adult / Child)
                                    </td>
                                    <td>
                                        ${booking.adultNumber} / ${booking.childMinorNumber + booking.childNumber}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Room Includes
                                    </td>
                                    <td>
                                        Continental Plan (Room + Breakfast + Taxes)
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Special Instructions
                                    </td>
                                    <td>
                                       ${booking.specialRequirement}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br>
                    <div class="footer">
            
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
                    <br>
                    <div>
                        <p><b>Terms and Conditions</b></p>
                        <ol>
                            <li>Check in time is at 14.00 hrs and checkout time is 12 noon.</li>
                            <li>Maximum two adults and one child below the age of 12 yrs are permitted per room without an extra bed.</li>
                            <li>Rates are quoted in Ngultrum/US Dollar and are based on single/double/triple occupancy.</li>
                            <li>Cancellation received less than 14 days prior to check in will incur 100% cancellation fee.</li>
                            <li>No show or early departures will be charged in full.</li>
                            <li>Early check in and late checkout may be considered on availability, and may be subject to additional charges. </li>
                        </ol>
                    </div>
            
                </div>
            
            
            </body>
            
            </html>
            `
        };

        transporter.sendMail(mailOptions, async function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
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
