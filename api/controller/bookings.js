const jwtSecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

const Booking = require("../models/Booking");

const createSingleBooking = async (req, res) => {
  try {
    const { ownerId, placeId } = req.body;

    const createdBooking = await Booking.create({
      ownerId,
      placeId,
    });
    res.json(createdBooking);
  } catch (error) {
    res.status(422).json(error.message ? error.message : error);
  }
};

const fetchAllBookings = async (req, res) => {
  try {
    // check token exist
    const { token } = req.cookies;
    if (!token) throw new Error("no jwt token provided");

    // verify token to get user id
    const verifiedToken = jwt.verify(token, jwtSecret, {});
    const { id } = verifiedToken;

    // find all bookings by userId
    const bookings = await Booking.find({ ownerId: id }).populate({
      path: "placeId",
    });
    res.json(bookings);
  } catch (error) {
    res.status(404).json("no bookings found");
  }
};

const deleteSingleBooking = async (req, res) => {
  const { bookingId } = req.body;
  await Booking.deleteOne({ _id: bookingId });

  res.json(`bookingId: ${bookingId} - deleted`);
};

module.exports = {
  createSingleBooking,
  fetchAllBookings,
  deleteSingleBooking,
};
