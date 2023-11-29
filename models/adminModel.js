const mongoose = require ('mongoose')
const validator = require ('validator')
const bcrypt = require('bcryptjs')

const adminSchema = new mongoose.Schema ({
    name:{
        type:String,
        required:[true,'Please enter your username']
    },
    email: {
        type:String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password:{
        type: String,
        required: [true, 'please provide a password'],
        minlength: 8,
    }
})
adminSchema.pre('save', async function (next){
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

adminSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword,
){
    return await bcrypt.compare(candidatePassword, userPassword)
}
const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin