const UserModel = require('../models/UserModel')

/*// Create and Save a new user
exports.create = async (req, res) => {
    if (!req.body.email && !req.body.name && !req.body.surname) {
        res.status(400).render('users', {mydata: "Content can not be empty!"})
    }

    const user = new UserModel({
        email: req.body.email,
        name: req.body.name,
        surname: req.body.surname,
        password: req.body.password
    });

    await user.save().then(data => {
        res.render('users', {mydata: "user "+ data.name +" created successfully!"})
    }).catch(err => {
        res.render('users', {mydata: err.message || "Some error occurred while creating user"})
    });
};
// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    try {
        const user = await UserModel.find()
        res.status(200).render('users', {mydata: user})
    } catch(error) {
        res.status(404).render('users', {mydata: error.message})
    }
};
// Find a single User with an id
exports.findOne = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.query.email}).exec(); //change params to query
        res.status(200).render('users', {mydata: "user :"+ user.name +" "
                + user.surname +" "+ user.email
        })
    } catch(error) {
        res.status(404).render('users', {mydata: error.message})
    }
};

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
exports.delete = async (req, res) => {
    await UserModel.deleteOne({email: req.query.email}).then(data => {
        if (!data) {
            res.status(404).render(path.resolve('public/pages/users.ejs'), {mydata: "User not found"}).redirect('/users')

        } else {
            res.render(path.resolve('public/pages/users.ejs'), {mydata: "user "+data.name+" deleted succesfully!"})
        }
    }).catch(err => {
        res.status(500).render(path.resolve('public/pages/users.ejs'), {mydata: err.message})
    });
};
*/


exports.create = async (req, res) => {
    if (!req.body.email && !req.body.name && !req.body.surname) {
        res.status(400).send({ message: "Content can not be empty!" })
    }
    const user = new UserModel({
        email: req.body.email,
        name: req.body.name,
        surname: req.body.surname,
        password: req.body.password,
    });

    await user.save().then(data => {
        res.send({
            message:"User created successfully!!!",
            user: data,
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user"
        });
    });
};

exports.findAll = async (req, res) => {
    try {
        const user = await UserModel.find();
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
};

exports.findOne = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
};

exports.update = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    await UserModel.findByIdAndUpdate(id, req.body, {
        useFindAndModify: false
    }). then(data => {
        if (!data) {
            res.status(404).send({
                message: `User not found.`
            });
        } else {
            res.send({ message: "User updated successfully." })
        }
    }).catch (err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.delete = async (req, res) => {
    await UserModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `User not found.`
            });
        } else {
            res.send({
                message: "User deleted successfully!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
