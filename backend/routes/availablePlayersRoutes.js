const express = require("express");
const router = express.Router();
const availablePlayersController = require("../controllers/availablePlayersController");

router.get(
  "/uniquePlayers/:userId",
  availablePlayersController.getUniquePlayers
);

module.exports = router;
