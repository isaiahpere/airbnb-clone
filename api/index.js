if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const User = require("./models/User");
const Place = require("./models/Place");
const Booking = require("./models/Booking");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const imageDownloader = require("image-downloader");
const multer = require("multer"); // middleware
const { storage } = require("./cloudinary/index");
const multerUploads = multer({ storage });
const fs = require("fs");

// server port
const PORT = 4000;

// encryption
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET;

// json body parser
app.use(bodyParser.json());
// parse token from cookie
app.use(cookieParser());
// public folder dir
app.use("/uploads", express.static(`${__dirname}/uploads`));

// cors the client url
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN_URL,
  })
);

// mongodb connection with mongoose
mongoose.connect(process.env.MONGOOSE_CONNECTION);

/*************** */
//
//  ROUTES
//
/*************** */

/**
 * POST - handle user registration
 * creates user in DB, creates JWT and returns cookie with token
 */
app.post("/register", async (req, res) => {
  // destruct body
  const { name, email, password } = req.body;

  // check email is not used before creating a new one.
  try {
    // if user exist throw error
    const foundUser = await User.findOne({ email });
    console.log(foundUser);
    if (foundUser) throw Error("email already in use");

    // create user in database
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    // response with user collection created
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(422).json(error);
  }
});

/**
 * POST - handles user login
 *  receives email, password. User is looked up by email
 *  user is used to create token
 */
app.post("/login", async (req, res) => {
  // destruct body
  const { email, password } = req.body;

  // find user
  const user = await User.findOne({ email });

  // check if user exist
  if (user) {
    const passOk = bcrypt.compareSync(password, user.password);
    // check password okay
    if (passOk) {
      // create token to send in cookie
      const token = jwt.sign({ email: user.email, id: user._id }, jwtSecret, {
        expiresIn: "12h",
      });

      // check token was signed successfully
      if (token) {
        res
          .cookie("token", token)
          .json({ user: { name: user.name, email: user.email, id: user._id } });
      } else {
        throw new Error("No Token generated -  login [post]");
      }
    } else {
      res.status(422).json({ error: "password not match" });
    }
    // no user throw error
  } else {
    // if no user then respons with no user found
    res.status(422).json({ error: "user not found" });
  }
});

/**
 * POST - handle user logout cleans up token
 */
app.post("/logout", (req, res) => {
  res.clearCookie("token").json({ redirect: true });
});

/**
 * POST - handle link upload to uploads folder
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

/**
 * POST - handles photo uploads to uploads folder.
 */
app.post("/upload", multerUploads.array("photos", 10), (req, res) => {
  const imageFiles = [];

  // NEED TO UPDATE API ROUTES FOR PLACE TO TAKE CLOUDINARY {URL, PATHNAME}

  // get the image data from multer-cloudinary-storage store in array
  if (req.files && req.files.length > 0) {
    req.files.forEach((file) => {
      imageFiles.push({ url: file.path, filname: file.filename });
    });
  }

  res.json(imageFiles);
});

/**
 * GET - attempt to auth user with JWT.
 */
app.get("/profile", async (req, res) => {
  try {
    // check token exist
    const { token } = req.cookies;
    if (!token) throw new Error("no jwt token provided");

    // verify token
    const verifiedToken = jwt.verify(token, jwtSecret, {});
    const { id } = verifiedToken;

    // find user by id
    const user = await User.findById(id);

    // if user found return user info, else throw error
    if (user) {
      return res.json({ name: user.name, email: user.email, id: user._id });
    }
    throw new Error("user not found!");
  } catch (error) {
    res.status(224).json(error.message);
  }
});

//*************************** */
// PLACES ROUTES
//*************************** */

/**
 * Handle creating new user in DB.
 */
app.post("/places", async (req, res) => {
  const {
    ownerId,
    title,
    address,
    city,
    state,
    pricePerNight,
    description,
    perks,
    additionalInfo,
    checkin,
    checkout,
    maxGuest,
    addedPhotos,
  } = req.body;

  // create user in db
  const createdPlace = await Place.create({
    owner: ownerId,
    title,
    address,
    city,
    state,
    pricePerNight,
    description,
    perks,
    additionalInfo,
    checkin,
    checkout,
    maxGuest,
    photos: addedPhotos,
  });

  res.json(createdPlace);
});

/**
 * GET - get all places that exist
 */
app.get("/all-places", async (req, res) => {
  try {
    // find the place
    const allPlaces = await Place.find({});
    // if (!placeDetails) throw new Error("no places found!");
    res.json(allPlaces);
  } catch (error) {
    res.status(422).json(error.message ? error.message : error);
  }
});

/**
 * GET - Handle getting a single place
 */
app.get("/place/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // find the place
    const placeDetails = await Place.findById(id);
    // if (!placeDetails) throw new Error("no places found!");
    res.json(placeDetails);
  } catch (error) {
    res.status(422).json(error.message ? error.message : error);
  }
});

/**
 * GET - Gets all the places for a single owner by owner id
 */
app.get(`/places/byowner/:userId`, async (req, res) => {
  try {
    const { userId } = req.params;
    const places = await Place.find({ owner: userId });
    if (!places) throw new Errro("No Places found");
    res.json(places);
  } catch (error) {
    res.status(422).json(error.message ? error.message : error);
  }
});

/**
 * PUT - update one place
 */
app.put("/places", async (req, res) => {
  const {
    placeId,
    ownerId,
    title,
    address,
    city,
    state,
    pricePerNight,
    description,
    perks,
    additionalInfo,
    checkin,
    checkout,
    maxGuest,
    addedPhotos,
  } = req.body;

  // find the place so we can compare the owner to the
  // owner requesting the PUT request
  const foundPlace = await Place.findById(placeId);

  // update only if owner owns the place that needs to be updated
  if (foundPlace.owner.toString() === ownerId) {
    const updatedPlace = await Place.updateOne(
      { _id: placeId },
      {
        title,
        address,
        city,
        state,
        pricePerNight,
        description,
        perks,
        additionalInfo,
        checkin,
        checkout,
        maxGuest,
        photos: addedPhotos,
      }
    );
    res.json(updatedPlace);
  } else {
    res.status(422).json("could not update place");
  }
});

//*************************** */
// BOOKINGS
//*************************** */

/**
 * save the bookings to database
 */
app.post("/bookings", async (req, res) => {
  try {
    const { ownerId, placeId } = req.body;

    const savedBooking = await Booking.create({
      ownerId,
      placeId,
    });
    res.json(`the ownerId === ${ownerId} && placeID === ${placeId}`);
  } catch (error) {
    res.status(422).json(error.message ? error.message : error);
  }
});

app.get("/bookings", async (req, res) => {
  const { userId, placeId } = req.body;

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
    res.status(404).json("not found");
  }
});

app.delete("/booking", async (req, res) => {
  const { ownerId, placeId, bookingId } = req.body;
  await Booking.deleteOne({ _id: bookingId });

  res.json(`bookingId: ${bookingId} - deleted`);
});

/**
 * Express Listener
 */
app.listen(PORT, () => {
  console.log(`Server Connection Established on port ${PORT}`);
});
