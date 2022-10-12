const express = require("express");

const app = express();

app.get("/test", (req, res) => {
  res.json("This only for test");
});

app.listen(4000, () => {
  console.log("Server is starting at port 4000");
});
