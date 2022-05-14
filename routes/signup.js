const express = require("express");
const router = express.Router();
const path = require("path");

router
    .route("/")
    .get((req, res) => res.render(path.resolve('public/views/signup.ejs')))
    .post((req, res) => res.render(path.resolve("public/views/signup.ejs")));
module.exports = router;