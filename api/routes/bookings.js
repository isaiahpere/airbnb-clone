const express = require("express");
const router = express.Router();

const {
  createSingleBooking,
  fetchAllBookings,
  deleteSingleBooking,
} = require("../controller/bookings");

router
  .route("/")
  .post(createSingleBooking)
  .get(fetchAllBookings)
  .delete(deleteSingleBooking);

module.exports = router;
