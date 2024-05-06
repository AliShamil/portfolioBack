const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    gallery: { type: String, required: true },
    playStoreLink: { type: String, required: false },
    appStoreLink: { type: String, required: false },
    domain: { type: String, required: false },
    githubLink: { type: String, required: false },
    projectType: { type: String, enum: ["web", "mobile", "backend"] },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project