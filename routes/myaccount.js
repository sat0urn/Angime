const express = require("express");
const router = express.Router();

router
    .route("/")
    .get(async (req, res) => {
        const user = req.cookies["context"]
        res.render('myaccount', {
            mydata: user,
        })
    })

module.exports = router;