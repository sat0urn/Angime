const express = require('express');
const ForumController = require('../controllers/ForumController');
const router = express.Router();

router.post('/createForum', ForumController.create);
router.get('/', ForumController.findAll);

module.exports = router;