var mongoose = require("mongoose");

var Type = mongoose.model("Type", {
  id_type: Number,
  name_type: {
    type: String,
    unique: true
  },
  image: String
});

module.exports = Type;