/**
 * POST
 * logout user by clearing token
 */
const logout = (req, res) => {
  res.clearCookie("token").json({ redirect: true });
};

module.exports = logout;
