const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bcryptSalt = bcrypt.genSaltSync(10);

// bcrypt
const jwtSecret = process.env.JWT_SECRET;

/**
 * POST -
 * handle user registration
 * creates user in DB
 */
const registerUser = async (req, res) => {
  // destruct body
  const { name, email, password } = req.body;

  // check email is not used before creating a new one.
  try {
    // if user exist throw error
    const foundUser = await User.findOne({ email });
    if (foundUser) throw Error("email already in use");

    // create user in database
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    // create token to send in cookie
    const token = jwt.sign({ email: user.email, id: user._id }, jwtSecret, {
      expiresIn: "12h",
    });

    if (token) {
      res
        .cookie("token", token)
        .json({ name: user.name, email: user.email, id: user._id });
    }
  } catch (error) {
    console.log(error);
    res.status(422).json(error);
  }
};

module.exports = registerUser;
