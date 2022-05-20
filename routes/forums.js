const express = require ("express");
const router = express.Router();
const {findAll} = require("../controllers/ForumController");

router
    .route("/")
    .get((req, res) => findAll(req, res))
    .post((req, res) => res.send("POST_FORUMS"));

module.exports = router