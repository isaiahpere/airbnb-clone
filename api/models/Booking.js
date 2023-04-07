const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const BookingModel = mongoose.model("Booking", bookingSchema);

module.exports = BookingModel;
