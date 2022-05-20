const express = require ("express");
const router = express.Router();

router
    .route("/")
    .get((req, res) => res.render('blogs'))
    .post((req, res) => res.send("POST_BLOGS"));

module.exports = router;