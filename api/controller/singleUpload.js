const imageDownloader = require("image-downloader");
const fs = require("fs");

/**
 * sample of single image upload using package image-downloader
 */

app.post("/link-uploads", async (req, res) => {
  const { link } = req.body;

  // append time to photo name
  const newName = `photo${Date.now()}.jpg`;

  // process photo link
  await imageDownloader.image({
    url: link,
    dest: `${__dirname}/uploads/${newName}`,
  });

  res.json(newName);
});
