const express = require("express");
const router = express.Router();
const Project = require("../models/project");

router.get("/", async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get("/:id", async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        res.json(project)
    } catch (err) {
        res.status(404).json({ message: "Project not found!" });
    }
});

router.post("/", async (req, res) => {
    const project = new Project({
        title: req.body.title,
        desc: req.body.desc,
        gallery: req.body.gallery,
        playStoreLink: req.body.playStoreLink,
        appStoreLink: req.body.appStoreLink,
        domain: req.body.domain,
        githubLink: req.body.githubLink,
        projectType: req.body.projectType,
    });
    try {
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: "Project deleted" });
    } catch (err) {
        req.status(404).json({ message: "Project not found" })
    }
})

router.put("/:id", async (req, res) => {
    try {
        const status = await Project.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            desc: req.body.desc,
            gallery: req.body.gallery,
            playStoreLink: req.body.playStoreLink,
            appStoreLink: req.body.appStoreLink,
            domain: req.body.domain,
            githubLink: req.body.githubLink,
            projectType: req.body.projectType,
        });
        res.json(status ? "Successfully Updated!" : "Error happened");
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

module.exports = router;