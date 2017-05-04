var express = require("express");
var bodyParser = require("body-parser");
var config = require("./config");
var morgan = require("morgan");
var app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.get("db"));

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());
app.use(require("./router/main"));

app.listen(config.get("port"), function () {
  console.log("Server is work!");
});