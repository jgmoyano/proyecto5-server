const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_JWT

const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    mail: { type: String },
    password: { type: String }
})

userSchema.methods.hashPassword = function (password) {
    this.password = bcrypt.hashSync(password, 16)
}

userSchema.methods.generateJWT = function () {
    return jwt.sign({userId: this._id, firstName: this.firstName, lastName: this.lastName}, secret)
}

userSchema.methods.onSignUpGenerateJWT = function () {
    return {
        userId: this._id,
        token: this.generateJWT()
    }
}

const User = mongoose.model('User', userSchema)

module.exports = User