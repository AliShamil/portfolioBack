const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    gallery: { type: String, required: true },
    refLinks: { type: String, required: false },
    category: { type: String, required: true },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;