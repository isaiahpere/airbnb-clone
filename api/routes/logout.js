const express = require("express");
const router = express.Router();
const logoutUser = require("../controller/logout");

/**
 * POST - handle user logout cleans up token
 */
router.post("/", logoutUser);

module.exports = router;
