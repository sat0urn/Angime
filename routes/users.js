const express = require ("express");
const {findAll} = require("../controllers/UserController");
const router = express.Router();

router
    .route("/")
    .get((req, res) => findAll(req, res))
    .post((req, res) => res.send("USERS_ROUTE"));

module.exports = router;