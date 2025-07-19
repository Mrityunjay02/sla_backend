const About = require("../models/About.model");
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

// Create
const createAbout = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array()
      });
    }

    const {
      title,
      subtitle,
      description1,
      description2,
      description3,
      Image1,
      Image2,
      Image3,
    } = req.body;

    // Validation
    if (!title || !subtitle || !description1 || !description2 || !description3) {
      return res.status(400).json({
        message: "Missing required fields",
        error: "Please provide all required fields"
      });
    }

    const newAbout = new About({
      title,
      subtitle,
      description1,
      description2,
      description3,
      Image1,
      Image2,
      Image3,
    });

    await newAbout.save();

    res.status(201).json({
      message: "About created successfully",
      data: newAbout,
    });
  } catch (error) {
    console.error("Error in createAbout:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get All
const getAllAbout = async (req, res) => {
  try {
    const abouts = await About.find().sort({ createdAt: -1 });

    if (!abouts.length) {
      return res.status(404).json({
        message: "No About found",
        data: []
      });
    }

    res.status(200).json({
      message: "Abouts fetched successfully",
      data: abouts,
    });
  } catch (error) {
    console.error("Error in getAllAbout:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get By ID
const getAboutById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid ID format"
      });
    }

    const about = await About.findById(id);

    if (!about) {
      return res.status(404).json({
        message: "About not found",
      });
    }

    res.status(200).json({
      message: "About fetched successfully",
      data: about,
    });
  } catch (error) {
    console.error("Error in getAboutById:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Update
const updateAbout = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid ID format"
      });
    }

    const {
      title,
      subtitle,
      description1,
      description2,
      description3,
      Image1,
      Image2,
      Image3,
    } = req.body;

    const about = await About.findById(id);

    if (!about) {
      return res.status(404).json({
        message: "About not found",
      });
    }

    // Only update fields that are provided
    if (title) about.title = title;
    if (subtitle) about.subtitle = subtitle;
    if (description1) about.description1 = description1;
    if (description2) about.description2 = description2;
    if (description3) about.description3 = description3;
    if (Image1) about.Image1 = Image1;
    if (Image2) about.Image2 = Image2;
    if (Image3) about.Image3 = Image3;

    await about.save();

    res.status(200).json({
      message: "About updated successfully",
      data: about,
    });
  } catch (error) {
    console.error("Error in updateAbout:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Delete
const deleteAbout = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid ID format"
      });
    }

    const about = await About.findById(id);

    if (!about) {
      return res.status(404).json({
        message: "About not found",
      });
    }

    await About.findByIdAndDelete(id);

    res.status(200).json({
      message: "About deleted successfully",
      data: about,
    });
  } catch (error) {
    console.error("Error in deleteAbout:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createAbout,
  getAllAbout,
  getAboutById,
  updateAbout,
  deleteAbout,
};
