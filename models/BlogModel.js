const mongoose = require('mongoose');
const path = require('path');

const coverImageBasePath = 'uploads/blogCovers'

let schema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    coverImageName: {
        type: String,
        required: true
    },
});

schema.virtual('coverImagePath').get(function () {
    if (this.coverImageName != null) {
        return path.join('/', coverImageBasePath, this.coverImageName)
    }
})

let blog = new mongoose.model('Blog', schema);

module.exports = blog;
module.exports.coverImageBasePath = coverImageBasePath;