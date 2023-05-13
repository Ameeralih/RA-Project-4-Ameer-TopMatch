const cardsController = require("../controllers/cardsController");
const express = require("express");
const router = express.Router();

router.post("/", cardsController.createCard);
router.get("/playerfromcard", cardsController.getPlayerFromCardId);

module.exports = router;
