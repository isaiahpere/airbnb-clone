const User = require("../models/User");
const bcrypt = require("bcryptjs");
const bcryptSalt = bcrypt.genSaltSync(10);

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

    // FIX-ME - should create token upon registration as well not just when login

    // response with user collection created
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(422).json(error);
  }
};

module.exports = registerUser;
