const express = require("express");
const router = express.Router();
const gameweeksController = require("../controllers/gameweeksController.js");

router.get("/currentgameweek", gameweeksController.getUpcomingGameweek);

module.exports = router;
