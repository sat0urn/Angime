const express = require('express');
const BlogController = require('../controllers/BlogController');
const router = express.Router();
const upload = require('../middlewares/uploadBlog')

router.get('/', BlogController.findAll);
router.post('/createBlog', upload.single('image'), BlogController.create);

module.exports = router;