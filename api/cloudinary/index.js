const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// cloudinary setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// multer storage cloudinary config
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "aircnc",
    allowed_formats: ["jpeg", "jpg", "png", "webp"],
  },
});

module.exports = {
  cloudinary,
  storage,
};
