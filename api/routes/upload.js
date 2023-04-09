const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const multerUploads = multer({ storage });

const savePhotosToDataStore = require("../controller/upload");

router.post("/", multerUploads.array("photos", 10), savePhotosToDataStore);

module.exports = router;
