const express = require("express");
const router = express.Router();
const {login} = require("../controllers/UserController");

router
    .route("/")
    .get((req, res) => res.render('signin'))
    .post((req, res) => login(req, res));

module.exports = router;