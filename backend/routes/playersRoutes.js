const express = require("express");
const router = express.Router();
const playersController = require("../controllers/playersController");

// usersRoutes.js
router.get("/players", playersController.getAllPlayers);

module.exports = router;
