const express = require("express");
const router = express.Router({ mergeParams: true }); // get all params
const login = require("../controller/login");

router.post("/", login);

module.exports = router;
