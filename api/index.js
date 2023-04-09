if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const loginRoutes = require("./routes/login");
const logoutRoutes = require("./routes/logout");
const registerRoutes = require("./routes/register");
const uploadRoutes = require("./routes/upload");
const profileRoutes = require("./routes/profile");
const bookingRoutes = require("./routes/bookings");
const placeRoutes = require("./routes/places");
const connectDataStore = require("./database/index");

// server port
const PORT = 4000;

/*************** */
//  MIDDLWARE
/*************** */
app.use(bodyParser.json());
app.use(cookieParser());
// app.use("/uploads", express.static(`${__dirname}/uploads`));

// cors the client url
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN_URL,
  })
);

/*************** */
//  DATA STORE
/*************** */
connectDataStore();

/*************** */
//  ROUTES
/*************** */
app.use("/login", loginRoutes);
app.use("/logout", logoutRoutes);
app.use("/profile", profileRoutes);
app.use("/register", registerRoutes);
app.use("/upload", uploadRoutes);
app.use("/bookings", bookingRoutes);
app.use("/places", placeRoutes);

/*************** */
//  SERVER
/*************** */
app.listen(PORT, () => {
  console.log(`Server Connection Established on port ${PORT}`);
});
