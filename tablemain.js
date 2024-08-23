const express = require("express");
const bodyparser = require("body-parser");

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));

app.use(bodyparser.json());
app.get("/", (req, res) => {
  res.json({ message: "welcome to ne api" });
});

require("./tableroute.js")(app);
app.listen(5000, () => {
  console.log("Server is running in the 5000 port number");
})
