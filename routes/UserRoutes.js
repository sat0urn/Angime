const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();

router.post('/register', UserController.create)
router.post('/login', UserController.login)
router.patch('/update/:email', UserController.update)
router.get('/', UserController.findAll)

module.exports = router;