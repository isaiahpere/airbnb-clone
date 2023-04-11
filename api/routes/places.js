const express = require("express");
const router = express.Router();

const {
  createSinglePlace,
  getAllPlaces,
  getSinglePlace,
  getAllPlacesByOwner,
  updateSinglePlace,
} = require("../controller/places");

router.route("/").post(createSinglePlace).get(getAllPlaces);

router.get("/:id", getSinglePlace);

router.get(`/byowner/:userId`, getAllPlacesByOwner);

router.put("/", updateSinglePlace);

module.exports = router;
