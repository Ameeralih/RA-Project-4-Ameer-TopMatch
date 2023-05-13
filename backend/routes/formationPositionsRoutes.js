const express = require("express");
const router = express.Router();
const formationPositionsController = require("../controllers/formationPositionsController"); // Import your formationPositions controller

// Add this line inside your routes setup function
router.get("/", formationPositionsController.getFormationPositions);

module.exports = router;
