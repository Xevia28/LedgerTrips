const Admin = require('./../models/adminModel')
const nodemailer = require('nodemailer')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
exports.RenderforgotPassword = async (req, res, next) => {
    try {
        res.render("./AdminLogin/forgotPass.ejs");
    } catch (error) {
        console.log(error);
    }
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const oldUser = await Admin.findOne({ email });
        if (!oldUser) {
            // return res.status(404).send("User Does Not Exist");
            var message = "Email Not Registered"
            return res.render('./AdminLogin/message.ejs', { status: message })
        }
        const secret = process.env.JWT_SECRET + oldUser.password;
        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "5m" });
        const link = `https://ledger-trips.onrender.com/api/forgotPassword/reset-password/${oldUser._id}/${token}`; // Update the URL with your domain name and port number
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: oldUser.email,
            subject: 'Update Your Password by clicking on the given link',
            // text: link
            html: `
            <!DOCTYPE html>
                <html lang="en">

                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Reset Email Button</title>

                    <style>
                    .data-container {
                    
                        font-family: sans-serif;
                        align-items: center;
                        width: 100%;
                        max-width: 700px;
                        background: #8dc72282;
                        padding: 1rem;
                        border-radius: 10px;
                        margin: 0 auto;
                        text-align: center;
                    }

                    .btn {
                        width: 200px;
                        background: #14A44d;
                        text-decoration: none;
                        color: #fff;
                        padding: .5rem;
                        text-align:center;
                        border-radius: 5px;
                        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
                        border: none;
                        margin:0 auto;

                    }

                    .btn:hover {
                        cursor: pointer !important;
                        filter: brightness(90%);
                    }
                    .warning-text{
                        font-weight: 600;
                        color: #14A44d;
                        margin-top: 1rem;
                    }
                </style>
                </head>

                <body>

                    <div class="data-container">
                        <form method="GET" action="${link}">
                            <button class="btn" type="submit">Reset Password</button>
                        </form>
                        <div class="warning-text">
                            The link will expire in 5 minutes
                        </div>
                    </div>


                </body>

            </html>
            `
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        var message = "A verification link has been sent to your email address.Please check your inbox and follow the instructions provided to reset your password."
        res.render('./AdminLogin/message.ejs', { status: message })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.resetPassword = async (req, res) => {
    const { id, token } = req.params;
    const oldUser = await Admin.findOne({ _id: id });
    if (!oldUser) {
        return res.send("User Does Not Exists")
    }
    const secret = process.env.JWT_SECRET + oldUser.password;
    try {
        const verify = jwt.verify(token, secret)
        res.render("./AdminLogin/reset-password.ejs", { email: verify.email, status: "Not Verified" })
    } catch (err) {
        var message = "The link has expired"
        res.render('./AdminLogin/message.ejs', { status: message })
    }
}
exports.updatePassword = async (req, res) => {
    const { id, token } = req.params;
    const { password, passwordConfirm } = req.body;

    const oldUser = await Admin.findOne({ _id: id });
    if (!oldUser) {
        // return res.send("User Does Not Exist");
        var message = "User Does Not Exist"
        return res.render('./AdminLogin/message.ejs', { status: message })
    }

    const secret = process.env.JWT_SECRET + oldUser.password;
    try {
        const verify = jwt.verify(token, secret);

        // Validate password and passwordConfirm
        if (password !== passwordConfirm) {
            // return res.status(400).json({ error: "Passwords do not match" });
            var message = "Passwords do not match"
            return res.render('./AdminLogin/message.ejs', { status: message })
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await Admin.updateOne(
            { _id: id },
            {
                $set: {
                    password: hashedPassword,
                }
            }
        );

        res.render("./AdminLogin/reset-password.ejs", { email: verify.email, status: "verified" })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
