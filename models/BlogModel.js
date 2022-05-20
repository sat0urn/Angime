const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    bodyOf: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
});

let blog = new mongoose.model('Blog', schema);

module.exports = blog;