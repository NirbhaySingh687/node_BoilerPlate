const express = require("express");
const router = express.Router()
const { getTasks, createTasks, deleteTasks, getSingleTask, updateTask } = require("../Controllers/task")
const asyncHandler = require("../Helper/higherOrderFunction")


router.route("/").get(asyncHandler(getTasks)).post(asyncHandler(createTasks));
router.route("/:id").get(getSingleTask).patch(updateTask).delete(deleteTasks)

module.exports = router;