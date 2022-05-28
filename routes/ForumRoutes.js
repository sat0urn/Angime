const express = require('express');
const ForumController = require('../controllers/ForumController');
const {isLoggedIn} = require('../middlewares/authMiddleware')
const router = express.Router();

router.get('/', isLoggedIn, ForumController.findAll);
router.post('/createForum', ForumController.create);

module.exports = router;