const BlogModel = require("../models/BlogModel");

// Create and Save a new forum
exports.create = async (req, res) => {
    if (!req.body.title && !req.body.author && !req.body.bodyOf) {
        res.status(400).render('blogs', {mydata: "Content can not be empty!"})
    }

    const blog = new BlogModel({
        title: req.body.title,
        bodyOf: req.body.bodyOf,
        author: req.body.author,
    });

    await blog.save().then(() => {
        res.redirect('/account')
    }).catch(() => {
        alert("You have the same author!")
    });
};

exports.findAll = async (req, res) => {
    try {
        const blog = await BlogModel.find();
        res.status(200).render('blogs', {mydata: blog})
    } catch (error) {
        res.status(404).render('blogs', {mydata: error.message})
    }
};

