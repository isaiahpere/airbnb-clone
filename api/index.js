const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
require("dotEnv").config();

const PORT = 4000;

const bcryptSalt = bcrypt.genSaltSync(10);

// cors the client url
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

// to parse body with json
app.use(bodyParser.json());

mongoose.connect(process.env.MONGOOSE_CONNECTION);

app.get("/login", (req, res) => {
  res.send("hello from login");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // check email is not used before creating a new one.

  try {
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

app.listen(PORT, () => {
  console.log(`Server Connection Established on port ${PORT}`);
});
