const express = require("express");
const router = express.Router();
const gameweekTeamsController = require("../controllers/gameweekTeamsController.js");

router.get(
  "/checkgameweekteamexists",
  gameweekTeamsController.checkGameweekTeamExists
);

router.patch("/:userId/:gameweekId", gameweekTeamsController.patchGameweekTeam);

module.exports = router;
