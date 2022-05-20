const express = require ("express");
const router = express.Router();

router
    .route("/")
    .get((req, res) => {
        if (typeof mydata === "undefined") {
            res.render('signup')
        }
        res.render('myaccount')
    })
    .post((req, res) => res.send("POST_ACC"));

module.exports = router;