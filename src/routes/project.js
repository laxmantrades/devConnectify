const express = require("express");
const { userAuth } = require("../Middlewares/auth");
const PROJECT = require("../models/projects.model");
const CONNECTION = require("../models/connectionRequest");
const USER = require("../models/user");
const projectRouter = express.Router();
const mongoose = require("mongoose");

projectRouter.post("/create-project", userAuth, async (req, res) => {
  try {
    const _id = req.user._id;
    const { projectName, projectImage, skills, description } = req.body;
    const imageUrl =
      projectImage?.trim() !== "" ? projectImage.trim() : undefined;

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
      imageUrl,
      creator: user,
    }).save();

    res.status(200).json({
      success: true,
      message: "Succefully created project",
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create project!",
    });
  }
});
projectRouter.get("/myprojects/:userId?", userAuth, async (req, res) => {
  try {
    const creatorId =
      req.params.userId !== undefined ? req.params.userId : req.user._id;
    const user = new mongoose.Types.ObjectId(creatorId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const project = await PROJECT.find({ "creator._id": user });
    

    res.status(200).json({
      success: true,
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

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    

    res.status(500).json({
      message: "Something went wrong",
    });
  }
});
projectRouter.get("/projects/interested&accepted", userAuth, async (req, res) => {
  try {
    const id = req.user._id;

    const connection = await CONNECTION.find({
      $or: [
        {
          fromUserID: id,
          $or: [{ status: "interested" }, { status: "accepted" }],
        },
        {
          toUserID: id,
          $or: [{ status: "interested" }, { status: "accepted" }],
        },
      ],
    });
    const creatorId = connection.map((connection) => {
      if (connection.fromUserID.equals(id)) {
        return new mongoose.Types.ObjectId(connection.toUserID);
      } else return new mongoose.Types.ObjectId(connection.fromUserID);
    });

    const project = await PROJECT.find({
      $or: [
        {
          "creator._id": id,
        },
        { "creator._id": { $in: creatorId } },
      ],
    });
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
module.exports = projectRouter;
