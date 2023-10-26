const express = require("express");
const router = express.Router();
const upload = require("../Connection/multer")
const { csvGen } = require("../Controllers/csvGen");

router.post("/", upload.any(), csvGen)

module.exports = router;