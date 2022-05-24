exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect("/signing")
}

exports.isAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next()
    }
    res.redirect("/account")
}