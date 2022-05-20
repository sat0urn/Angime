const express = require('express');
const ForumController = require('../controllers/ForumController');
const router = express.Router();

router.get('/', ForumController.findAll);
router.post('/', ForumController.create);

module.exports = router;