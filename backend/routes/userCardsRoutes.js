const express = require("express");
const router = express.Router();
const userCardsController = require("../controllers/userCardsController");

router.post("/create", userCardsController.createUserCard);
router.get("/allusercards", userCardsController.userCards);

module.exports = router;
