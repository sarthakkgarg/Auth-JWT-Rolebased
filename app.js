const express = require("express");
const jwt = require("jsonwebtoken");
const authorize = require("./authorization-middleware");
const config = require("./config");
const app = express();
const port = process.env.PORT || 5000;

app.get("/token", (req, res) => {
  const payload = {
    name: "Sarthak",
    scopes: "customer:read"
  };

  const token = jwt.sign(payload, config.JWT_SECRET);
  res.send(token);
});

app.get("/verify", authorize("customer:read"), (req, res) => {
  res.send("Authorisation Successfull.");
});

const server = app.listen(port, () => {
  console.log(`Server is listening on ${server.address().port}`);
});
