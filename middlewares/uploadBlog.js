const multer = require('multer')
const BlogModel = require('../models/BlogModel')
const path = require('path')
const uploadPath = path.join('public', BlogModel.coverImageBasePath)
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
})

module.exports = upload;