/**
 * saves cloudinary url to photos array in mongo
 */
const savePhotosToDataStore = (req, res) => {
  const imageFiles = [];

  if (req.files && req.files.length > 0) {
    req.files.forEach((file) => {
      imageFiles.push({ url: file.path, filename: file.filename });
    });
  }

  res.json(imageFiles);
};

module.exports = savePhotosToDataStore;
