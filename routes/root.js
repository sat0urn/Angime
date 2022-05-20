const express = require("express");
const router = express.Router();

router
    .route("/")
    .get((req, res) => res.render('index'))
    .post((req, res) => res.send("POST_ROOT"))

module.exports = router;