const ForumModel = require("../models/ForumModel");

// Create and Save a new forum
exports.create = async (req, res) => {
    if (!req.body.title && !req.body.author && !req.body.bodyOf) {
        res.status(400).render('forums', {mydata: "Content can not be empty!"})
    }

    const forum = new ForumModel({
        title: req.body.title,
        bodyOf: req.body.bodyOf,
        author: req.body.author,
    });

    await forum.save().then(() => {
        res.redirect('/account')
    }).catch(() => {
        alert("You have the same author!")
    });
};

// Finding all forums
exports.findAll = async (req, res) => {
    try {
        const forum = await ForumModel.find();
        res.status(200).render('forums', {mydata: forum})
    } catch (error) {
        res.status(404).render('404', {mydata: error.message})
    }
};

