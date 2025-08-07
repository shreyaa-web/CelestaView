const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema({
  source: { type: String, required: true },
  destination: { type: String, required: true },
  resultBodies: [String], // list of bodies between source and destination
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Search", searchSchema);
