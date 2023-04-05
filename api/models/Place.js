const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  address: String,
  city: String,
  state: String,
  pricePerNight: Number,
  photos: [String],
  description: String,
  perks: [String],
  additionalInfo: String,
  checkin: Number,
  checkout: Number,
  maxGuest: Number,
});

const PlaceModel = mongoose.model("Place", placeSchema);

module.exports = PlaceModel;
