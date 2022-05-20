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
        res.redirect('/')
    }).catch(err => {
        res.render('users', {mydata: err.message || "Some error occurred while creating user"})
    });
};

// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    try {
        const user = await UserModel.find();
        res.status(200).render('users', {mydata: user})
    } catch(error) {
        res.status(404).render('users', {mydata: error.message})
    }
};

// Find a single User with an id
exports.findOne = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.query.email}).exec();
        res.status(200).render('users', {mydata: "user :"+ user.name +" "
                + user.surname +" "+ user.email +" "+ user.password
        })
    } catch(error) {
        res.status(404).render('users', {mydata: error.message})
    }
};

// Login
exports.login = async (req, res) => {
    const user = await UserModel.findOne({email: req.body.email}).exec();

    if (user === "")
        res.status(404).redirect('/');

    res.status(200).render('myaccount', {mydata : user});
}

// Check
exports.check = async (req, res) => {
    if (!gate)
        res.status(404).redirect('/signup');

    res.status(200).render('myaccount', {mydata : user});
}

// Update a user by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `User not found.`
            });
        }else{
            res.send({ message: "User updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {
    await UserModel.deleteOne({email: req.query.email}).then(data => {
        if (!data) {
            res.status(404).render('users', {mydata: "User not found"}).redirect('/')
        } else {
            res.render('users', {mydata: "user "+data.name+" deleted succesfully!"})
        }
    }).catch(err => {
        res.status(500).render('users', {mydata: err.message})
    });
};