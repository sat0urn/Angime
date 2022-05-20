const express = require("express");
const router = express.Router();
const {create} = require("../controllers/UserController");

router
    .route("/")
    .get((req, res) => res.render('signup'))
    .post((req, res) => create(req, res))

module.exports = router;