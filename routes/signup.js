const express = require("express");
const router = express.Router();
const path = require("path");
const ejs = require("ejs")

router
    .route("/")
    .get((req, res) => res.render(path.resolve('public/views/signup.ejs')))
    .post((req, res) => res.send("POST_SIGN"));
module.exports = router;