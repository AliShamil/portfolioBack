const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");

router.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get("/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.json(blog)
    } catch (err) {
        res.status(404).json({ message: "Blog not found!" });
    }
});

router.post("/", async (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        desc: req.body.desc,
        gallery: req.body.gallery,
        refLinks: req.body.refLinks,
        category: req.body.category,
    });
    try {
        const newBlog = await blog.save();
        res.status(201).json(newBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.json({ message: "Blog deleted" });
    } catch (err) {
        req.status(404).json({ message: "Blog not found" })
    }
})

router.put("/:id", async (req, res) => {
    try {
        const status = await Blog.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            desc: req.body.desc,
            gallery: req.body.gallery,
            refLinks: req.body.refLinks,
            category: req.body.category,
        });
        res.json(status ? "Successfully Updated!" : "error happened");
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})
module.exports = router;