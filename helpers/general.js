require('dotenv').config();
var bcrypt = require('bcrypt');
var emailValidator = require('email-validator');
var jwt = require('jsonwebtoken');
require('dotenv').config();

exports.encryptPass = (text) => {
    return bcrypt.hash(text, 10)
        .then((hashed) => {
            return hashed;
        });
}

exports.isPasswordMatch = (plainText, hashedText) => {
    return bcrypt.compare(plainText, hashedText)
        .then((result) => {
            return result;
        })
}

exports.isFormatEmail = (email) => {
    return emailValidator.validate(email);
}

exports.generateAccessToken = (json) => {
    return jwt.sign(json, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_LIFETIME
    });
}