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
  // destruct
  const { email, password } = req.body;

  // check user exist if not throw error
  const user = await User.findOne({ email });
  if (!user) throw new Error("No user found");

  // check user password
  const passOk = bcrypt.compareSync(password, user.password);

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
};

module.exports = login;
