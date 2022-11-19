const mongoose = require("mongoose");

// CREATE SCHEMA

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ userID: String }],
  events: [{ eventID: String }],
});

// CREATE MODEL

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;
