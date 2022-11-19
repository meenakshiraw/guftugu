const express = require("express");

const app = express();
const PORT = 3009;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hey baby!");
});

app.listen(PORT, () => {
  console.log("Hey we are playing on our favorite port:", PORT);
});
