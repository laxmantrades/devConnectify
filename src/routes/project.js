const express = require("express");
const { userAuth } = require("../Middlewares/auth");
const PROJECT = require("../models/projects.model");
const USER = require("../models/user");
const projectRouter = express.Router();

projectRouter.post("/create-project", userAuth, async (req, res) => {
  try {
    const _id = req.user._id;
    const { projectName, projectImage, skills, description } = req.body;

    const user = await USER.findById(_id).select(
      "firstName lastName about skills photoUrl"
    );
    if (!user) {
      return res.status(400).json({
        message: "No user found",
      });
    }
    const project = await PROJECT({
      projectName,
      skills,
      description,
      projectImage,
      creator: user,
    }).save();
    res.status(200).json({
      message: "Succefully created project",
      project,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create project!",
    });
  }
});
projectRouter.get("/myprojects", userAuth, async (req, res) => {
  try {
    const user = req.user._id;
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const project = await PROJECT.find({ "creator._id": user });
    res.status(200).json({
      message: "Successfully fetched project",
      project,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch projects",
    });
  }
});
projectRouter.get("/projects", userAuth, async (req, res) => {
  try {
    const project = await PROJECT.find();
    res.status(200).json({
      message: "Succefully fetched the data",
      project,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch projects",
    });
  }
});
projectRouter.get("/project/view/:projectId", userAuth, async (req, res) => {
  try {
    const _id = req.params.projectId;

    if (!_id) {
      return res.status(404).json({
        message: "Id is required",
      });
    }
    const project = await PROJECT.findOne({ _id });

    res.status(200).json({
      message: "Succefull fetched data",
      project: project || [],
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to fetch project",
    });
  }
});


projectRouter.patch("/project/edit/:projectId", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const { projectName, projectImage, skills, description } = req.body;
    const { projectId } = req.params;
    const project = await PROJECT.findOneAndUpdate(
      {
        _id: projectId,
        "creator._id": user._id,
      },
      { $set: { projectName, projectImage, skills, description } }, // Update
      { new: true }
    );
    if (!project) {
      return res.status(404).send({
        message: "Failed to find the project",
      });
    }
    

    res.send(project);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});
module.exports = projectRouter;
