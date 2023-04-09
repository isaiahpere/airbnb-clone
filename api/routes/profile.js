const express = require("express");
const router = express.Router();

const authUser = require("../controller/profile");

/**
 * GET - auth user
 */
router.get("/", authUser);

module.exports = router;
