const mongoose = require("mongoose");
const chalk = require("chalk");

const connectDB = () => {
  // mongodb connection with mongoose
  mongoose.connect(process.env.MONGOOSE_CONNECTION);
  console.log(chalk.blue("- mongo DB connected -"));
};

module.exports = connectDB;
