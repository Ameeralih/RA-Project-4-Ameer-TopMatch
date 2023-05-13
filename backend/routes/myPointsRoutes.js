const express = require("express");
const router = express.Router();
const myPointsController = require("../controllers/myPointsController"); // Import your formationPositions controller

// Add this line inside your routes setup function
router.get(
  "/getsquadandpoints/:userId/gameweek/:gameweekId",
  myPointsController.getSquadAndPoints
);

module.exports = router;
