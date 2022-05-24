const passport = require("passport");
const express = require('express')
const router = express()

router.get("/google", passport.authenticate("google", {scope: ["email"]}))
router.get("/google/angime", passport.authenticate("google", {failureRedirect: "/signing"}),
    function (req, res) {
        res.cookie("context", req.user, { httpOnly: true })
        res.redirect("/account")
    }
)

module.exports = router
