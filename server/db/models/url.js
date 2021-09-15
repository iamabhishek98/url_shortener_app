const mongoose = require("mongoose");

const url = new mongoose.Schema({
  urlCode: { type: String, unique: true, required: true },
  originalUrl: { type: String, required: true },
  lastAccessedAt: { type: Date, required: true, default: Date.now },
  expired: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model("Url", url);
