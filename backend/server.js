const express = require("express");

const app = express();
require("dotenv").config();
const PORT = 3009;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hey baby!");
});

require("./config/db.connections");

const routes = require("./routes");
app.use("/", routes.groups);

app.listen(PORT, () => {
  console.log("Hey we are playing on our favorite port:", PORT);
});
