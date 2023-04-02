const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const User = require("./models/User");
const Place = require("./models/Place");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const imageDownloader = require("image-downloader");
const multer = require("multer"); // middleware
const multerUploads = multer({ dest: "uploads/" });
const fs = require("fs");
require("dotenv").config();

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

// GET - DUMMY
app.get("/login", (req, res) => {
  res.send("hello from login");
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
 * POST - handle user logout cleans up token
 */
app.post("/logout", (req, res) => {
  res.cookie("token", "").json({ redirect: true });
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
app.post("/upload", multerUploads.array("photos", 12), (req, res) => {
  const uploadedFiles = [];

  req.files.forEach((file) => {
    // get extension, re-write file with extension & push to array

    const { path, filename, originalname } = file;
    const fileExtension = originalname.split(".").slice(-1)[0];
    const newFilename = `${filename}.${fileExtension}`;
    fs.renameSync(path, `${path}.${fileExtension}`);
    uploadedFiles.push(newFilename);
  });

  res.json(uploadedFiles);
});

app.post("/places", (req, res) => {
  // owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  // title: String,
  // address: String,
  // photos: [String],
  // description: String,
  // perks: [String],
  // extraInfo: String,
  // checkIn: Number,
  // checkout: Number,
  // maxGuest: Number,
  const { user } = req.body;
  res.json(`the user is ${user}`);
});

/**
 *  LEFT HER:
 * I'm in the process of building this end point that accepts the form values.
 * I have to create the logic that will create a new place in the DB.
 */
app.listen(PORT, () => {
  console.log(`Server Connection Established on port ${PORT}`);
});
