const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotEnv").config();

// server port
const PORT = 4000;

// encryption
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET;

// json body parser
app.use(bodyParser.json());
// parse token from cookie
app.use(cookieParser());

// cors the client url
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN_URL,
  })
);

// mongodb connection with mongoose
mongoose.connect(process.env.MONGOOSE_CONNECTION);

// end points

// GET
app.get("/login", (req, res) => {
  res.send("hello from login");
});

//  GET - auth user with token from browser
app.get("/profile", async (req, res) => {
  try {
    // check token exist
    const { token } = req.cookies;
    if (!token) throw new Error("no jwt token provided");

    // verify token
    const verifiedToken = jwt.verify(token, jwtSecret, {});
    const { id } = verifiedToken;
    const user = await User.findById(id);
    if (user) {
      return res.json({ name: user.name, email: user.email, id: user._id });
    }
    throw new Error("user not found!");
  } catch (error) {
    res.status(224).json(error.message);
  }
});

// POST - login user
app.post("/login", async (req, res) => {
  // destruct body
  const { email, password } = req.body;

  // find user
  const user = await User.findOne({ email });

  // check if user exist
  if (user) {
    const passOk = bcrypt.compareSync(password, user.password);
    if (passOk) {
      // create token to send in cookie
      const token = jwt.sign({ email: user.email, id: user._id }, jwtSecret, {
        expiresIn: "12h",
      });

      if (token) {
        res.cookie("token", token).json(user);
      } else {
        throw new Error("No Token generated -  login [post]");
      }
    } else {
      res.status(422).json("password not match");
    }
  } else {
    // if no user then respons with no user found
    res.json("user not found");
  }
});

// POST - register user
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

// POST logout user
app.post("/logout", (req, res) => {
  res.cookie("token", "").json({ redirect: true });
});

app.listen(PORT, () => {
  console.log(`Server Connection Established on port ${PORT}`);
});
