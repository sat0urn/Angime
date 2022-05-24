const BlogModel = require("../models/BlogModel");

// Create and Save a new forum
exports.create = async (req, res) => {
    const fileName = req.file != null ? req.file.filename : null
    const blog = new BlogModel({
        title: req.body.title,
        body: req.body.body,
        coverImageName: fileName,
    })

    try {
        const newBlog = await blog.save()
        console.log("Blog was uploaded!")
        res.redirect("/account")
    } catch(err) {
        console.log(err)
        res.redirect("/")
    }
};

exports.findAll = async (req, res) => {
    try {
        const blogs = await BlogModel.find({})
        res.render("blogs", {
            blogsData: blogs
        })
    } catch {
        res.redirect("/")
    }

};

