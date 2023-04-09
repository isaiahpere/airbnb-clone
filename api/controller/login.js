const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// bcrypt
const jwtSecret = process.env.JWT_SECRET;

/**
 *  POST
 *  handle login request
 */
const login = async (req, res) => {
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
};

module.exports = login;
