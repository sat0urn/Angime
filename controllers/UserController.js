const UserModel = require('../models/UserModel')
const passport = require('passport')

// Create and Save a new user
exports.registration = async (req, res) => {

    UserModel.register(new UserModel({
        email: req.body.email,
        username: req.body.username,
        phone: req.body.phone,
        city: req.body.city,
        surname: req.body.surname,
    }), req.body.password, (error, user) => {
        if (error) {
            console.log(error.message)
        }
        passport.authenticate('local',
            {
                failureRedirect: "/signup",
                failureFlash: true
            }
        )(req, res, function () {
            res.cookie("context", user, {httpOnly: true})
            res.redirect("/account")
        })
    })
};

// Login
exports.login = async (req, res) => {

    let user = new UserModel({
        email: req.body.email,
        password: req.body.password
    })

    req.login(user, function (err) {
        if (err) {
            console.log("ERROR!")
        } else {
            passport.authenticate('local',
                {
                    failureRedirect: "/signing",
                    failureFlash: true
                }
            )(req, res, async function () {
                const UserOf = await UserModel.findOne({email: req.body.email}).exec()
                res.cookie("context", UserOf, {httpOnly: true})
                res.redirect("/account")
            })
        }
    })
}

// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    try {
        const user = await UserModel.find();
        res.status(200).render('users', {mydata: user})
    } catch (error) {
        res.status(404).render('users', {mydata: error.message})
    }
};

// Find a single User with an email
exports.findOne = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.query.email}).exec();
        res.status(200).render('users', {
            mydata: "user :" + user.username + " "
                + user.surname + " " + user.email
        })
    } catch (error) {
        res.status(404).render('users', {mydata: error.message})
    }
};

// Update a user by the email
exports.update = async (req, res) => {
    if (!req.body.newName && !req.body.newSurname && !req.body.newCity && !req.body.newPhone) {
        res.status(400).send("Content can not be empty!")
    }

    const currentEmail = req.params.email;

    await UserModel.findOneAndUpdate({email: currentEmail}, {
        username: req.body.newName,
        surname: req.body.newSurname,
        city: req.body.newCity,
        phone: req.body.newPhone
    }).then(async () => {
        const user = await UserModel.findOne({email: currentEmail}).exec();
        res.cookie("context", user, {httpOnly: true})
        res.redirect("/account")
    }).catch((err) => {
        res.status(500).send(err);
    })
};

// Delete a user with the specified email
exports.delete = async (req, res) => {
    const currentEmail = req.params.email;

    await UserModel.findOneAndDelete({email: currentEmail}).then(() => {
        res.clearCookie("context", {httpOnly: true})
        res.redirect("/")
    }).catch(err => {
        res.status(500).send(err);
    });
};

// Exit
exports.logout = async (req, res) => {
    req.logout(() => {
        res.clearCookie("context", {httpOnly: true})
        res.redirect("/")
    })
    /*res.clearCookie("context", { httpOnly: true })
    res.redirect("/");*/
}