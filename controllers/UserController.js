const UserModel = require('../models/UserModel')

// Create and Save a new user
exports.create = async (req, res) => {
    if (!req.body.email && !req.body.name && !req.body.surname && !req.body.password
        && !req.body.phone && !req.body.city) {
        res.status(400).render('users', {mydata: "Content can not be empty!"})
    }

    const user = new UserModel({
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone,
        city: req.body.city,
        surname: req.body.surname,
        password: req.body.password
    });

    await user.save().then(() => {
        res.cookie("context", user, { httpOnly: true })
        res.redirect('/account')
    }).catch(err => {
        console.log(err)
    });
};

// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    try {
        const user = await UserModel.find();
        res.status(200).render('users', {mydata: user})
    } catch (error) {
        res.status(404).render('users', {mydata: error.message})
    }
};

// Find a single User with an id
exports.findOne = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.query.email}).exec();
        res.status(200).render('users', {
            mydata: "user :" + user.name + " "
                + user.surname + " " + user.email + " " + user.password
        })
    } catch (error) {
        res.status(404).render('users', {mydata: error.message})
    }
};

// Login
exports.login = async (req, res) => {
    const user = await UserModel.findOne({email: req.body.email}).exec();

    if (user === "")
        res.status(404).redirect('/');

    res.cookie("context", user, {httpOnly: true})

    if (user.password === req.body.password) {
        res.redirect('/account')
    } else {
        res.redirect('/signing');
    }
}

// Update a user by the id in the request
exports.update = async (req, res) => {
    if (!req.body.newName && !req.body.newSurname && !req.body.newCity && !req.body.newPhone) {
        res.status(400).send("Content can not be empty!")
    }

    const currentEmail = req.params.email;

    await UserModel.findOneAndUpdate({email: currentEmail}, {
        name: req.body.newName,
        surname: req.body.newSurname,
        city: req.body.newCity,
        phone: req.body.newPhone
    }).then(async () => {
        const user = await UserModel.findOne({email: currentEmail}).exec();
        res.cookie("context", user, {httpOnly: true})
        res.redirect("/account")
    }).catch((err) => {
        console.log(err)
    })
};

// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {
    const currentEmail = req.params.email;

    await UserModel.findOneAndDelete({email: currentEmail}).then(() => {
        res.clearCookie("context", {httpOnly: true})
        res.redirect("/")
    }).catch(err => {
        res.status(500).alert(err);
    });
};

// Exit
exports.logout = async (req, res) => {
    res.clearCookie("context", { httpOnly: true })
    res.redirect("/");
}