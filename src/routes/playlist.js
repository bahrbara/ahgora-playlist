const express = require("express");
const router = express.Router();
const controller = require("../controllers/playlist");

router.get("/", controller.get);

module.exports = router;
