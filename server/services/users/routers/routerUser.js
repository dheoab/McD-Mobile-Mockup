const express = require("express");
const router = express.Router();

const Controller = require("../controllers/controllerUser");

router.get("/", Controller.findAllUsers);
router.get("/:id", Controller.findUserById);
router.post("/", Controller.createUser);
router.delete("/:id", Controller.deleteUserById);

module.exports = router;
