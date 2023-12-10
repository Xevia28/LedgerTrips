const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const customBookingRoutes = require('./routes/customBookingRoutes')
const bookingRoutes = require('./routes/bookingRoutes')
const roomTypeRoutes = require('./routes/roomTypeRoutes')
const calendarRoutes = require('./routes/calendarRoutes')
const searchRoutes = require('./routes/searchRoutes')
const usdRoutes = require('./routes/usdRateRoutes')
const QR = require('./routes/QR')
const adminRoom = require('./routes/adminRoom')
const admin = require('./routes/adminRoutes')
const forgotPassword = require('./routes/ForgotPassword')

const adminController = require('./controllers/adminController')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use("/public/images", express.static(__dirname + "/public/images"));


app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.json())

app.use('/api/customBooking', customBookingRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/usdrate', usdRoutes)
app.use('/api/roomtypes', roomTypeRoutes)
app.use('/api/xrpltransaction', adminController.protect, QR)
app.use('/api/adminroom', adminController.protect, adminRoom)
app.use('/api/admin', admin)
app.use('/', searchRoutes)
app.use('/api/forgotPassword', forgotPassword)
app.use('/api/calendar', adminController.protect, calendarRoutes)
module.exports = app