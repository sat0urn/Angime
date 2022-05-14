const express = require('express');
const ForumController = require('../controllers/forumController');
const router = express.Router();

router.get('/', ForumController.findAll);
router.get('/:author', ForumController.findOne);
router.post('/', ForumController.create);
router.patch('/:author', ForumController.update);
router.delete('/:author', ForumController.delete);

module.exports = router;