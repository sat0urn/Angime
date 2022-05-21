const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption')

let schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        default: '',
    },
    city: {
        type: String,
        default: '',
    },
    phone: {
        type: Number,
        unique: true,
        default: '',
    },
    surname: {
        type: String,
        default: '',
    },
    password: {
        type: String,
        required: true,
    },
});

schema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["password"] })

let user = new mongoose.model('User', schema);

module.exports = user;