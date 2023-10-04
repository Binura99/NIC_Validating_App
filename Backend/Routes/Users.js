const express = require("express");
const UserController = require("../Controller/UsersController")

const router = express.Router();

router.get("/", UserController.getUsers);
router.get("/:id", UserController.getUser);
router.post("/", UserController.register);
router.post("/login", UserController.loginUser);
router.delete("/delete/:id", UserController.deleteUser);
router.put("/update/:id", UserController.editUser);
router.get("/otp/:username", UserController.getUsername);

module.exports = router;