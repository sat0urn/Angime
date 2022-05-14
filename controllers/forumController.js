const ForumModel = require("../models/ForumModel");
exports.create = async (req, res) => {
    if (!req.body.author && !req.body.title && !req.body.date) {
        res.status(400).send({ message: "Content can not be empty!" })
    }
    const forum = new ForumModel({
        author: req.body.author,
        title: req.body.title,
        date: req.body.date,
    });

    await forum.save().then(data => {
        res.send({
            message:"Forum created successfully!!!",
            forum: data,
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user"
        });
    });
};

exports.findAll = async (req, res) => {
    try {
        const forum = await ForumModel.find();
        res.status(200).json(forum);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
};

exports.findOne = async (req, res) => {
    try {
        const forum = await ForumModel.findById(req.params.id);
        res.status(200).json(forum);
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

    await ForumModel.findByIdAndUpdate(id, req.body, {
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
    await ForumModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Forum not found.`
            });
        } else {
            res.send({
                message: "Forum deleted successfully!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};