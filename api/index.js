const express = require("express");
const app = express();
const PORT = 4000;

app.get("/login", (req, res) => {
  res.send("hello from login");
});

app.listen(PORT, () => {
  console.log(`Server Connection Established on port ${PORT}`);
});
