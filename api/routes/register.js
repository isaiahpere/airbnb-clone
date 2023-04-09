const express = require("express");
const router = express.Router();
const registerUser = require("../controller/register");

/**
 * POST - handle user registration
 * creates user in DB, creates JWT and returns cookie with token
 */
router.post("/", registerUser);

module.exports = router;
