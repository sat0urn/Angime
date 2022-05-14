const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        default: '',
    },
    date: {
        type: Number,
        required: true,
    },
});

let forum = new mongoose.model('Forum', schema);

module.exports = forum;