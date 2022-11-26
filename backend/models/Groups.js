const mongoose = require("mongoose");

// CREATE SCHEMA

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: String }],
  events: [{ type: String }],
  img: String,
});

// CREATE MODEL

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;
