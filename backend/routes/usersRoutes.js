// routes/usersRoutes.js

const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// usersRoutes.js
router.get("/id/:id", usersController.getUserById);
router.get("/email/:email", usersController.getUserByEmail);
router.post("/user", usersController.addUser);
router.put("/user/name-team", usersController.updateUserNameAndTeam);
router.get("/:userId/balance", usersController.getUserBalance);
router.put("/update-balance", usersController.updateBalance);

module.exports = router;
