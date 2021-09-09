const mongoose = require("mongoose");

const url = new mongoose.Schema({
  urlCode: { type: String, unique: true, required: true },
  originalUrl: { type: String, required: true },
});

module.exports = mongoose.model("Url", url);
