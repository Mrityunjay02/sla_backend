const express = require("express");
const router = express.Router();
const { validateAbout, handleValidationErrors } = require("../middleware/aboutValidation");
const {
  createAbout,
  getAllAbout,
  getAboutById,
  updateAbout,
  deleteAbout,
} = require("../controller/About.Controller");

// Create About
router.post("/", validateAbout, handleValidationErrors, createAbout);

// Get All About
router.get("/", getAllAbout);

// Get About by ID
router.get("/:id", getAboutById);

// Update About
router.put("/:id", validateAbout, handleValidationErrors, updateAbout);

// Delete About
router.delete("/:id", deleteAbout);

module.exports = router;
