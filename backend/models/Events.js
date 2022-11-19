const mongoose = require("mongoose");

// CREATE SCHEMA

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: String,
  date: { type: Date, required: true },
  meetingCode: { type: String, required: true },
  meetingPswd: { type: String, required: true },
  meetingURL: { type: String, required: true },
});

// CREATE MODEL

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
