const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();

router.get('/', UserController.findAll)
router.post('/register', UserController.registration)
router.post('/login', UserController.login)
router.get('/logout', UserController.logout)
router.patch('/update/:email', UserController.update)
router.delete('/delete/:email', UserController.delete)

module.exports = router;