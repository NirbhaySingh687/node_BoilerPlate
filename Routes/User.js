const express = require("express");
const userController = require("../Controllers/User")
const asyncHandler = require("../Helper/higherOrderFunction")
const auth = require("../Middleware/auth")
const router = express.Router();

router.route("/").post(asyncHandler(userController.register)).get(asyncHandler(userController.login))
router.route("/:id").get(asyncHandler(auth),asyncHandler(userController.getProfile));

module.exports = router;