const express = require ("express");
const router = express.Router();
const path = require("path");
router
    .route("/")
    .get((req, res) => res.render(path.resolve('public/views/users.ejs')))
    .post((req, res) => res.send("POST_USERS"));
module.exports = router;