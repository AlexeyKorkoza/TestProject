var express = require("express");
var config = require("./config");
var app = express();

app.listen(config.get("port"), function () {
  console.log("Server is work!");
});