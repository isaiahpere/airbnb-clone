const User = require("../models/User");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const authUser = async (req, res) => {
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
};

module.exports = authUser;
