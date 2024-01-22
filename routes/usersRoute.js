const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const userController = require("../controllers/userController");

// Endpoints
router.get("/getUsers/:page", authenticate, userController.getUsers);
router.get("/getUser/:id", authenticate, userController.getUser);
router.post("/createUser", authenticate, userController.createUser);
router.put("/updateUser/:id", authenticate, userController.updateUser);
router.delete("/deleteUser/:id", authenticate, userController.deleteUser);

module.exports = router;
