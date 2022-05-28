const express = require('express');
const BlogController = require('../controllers/BlogController');
const router = express.Router();
const upload = require('../middlewares/uploadBlog')
const {isLoggedIn} = require('../middlewares/authMiddleware')

router.get('/', isLoggedIn, BlogController.findAll);
router.post('/createBlog', upload.single('image'), BlogController.create);

module.exports = router;