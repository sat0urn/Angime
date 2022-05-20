const express = require('express');
const BlogController = require('../controllers/BlogController');
const router = express.Router();

router.get('/', BlogController.findAll);
router.post('/', BlogController.create);

module.exports = router;