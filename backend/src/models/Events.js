const mongoose = require("mongoose");

const TicketTypeSchema = new mongoose.Schema({
  name: String,
  price: Number,
  totalAvailable: Number,
  sold: { type: Number, default: 0 },
});

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  bannerImage: String,
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  ticketTypes: [TicketTypeSchema],
});

module.exports = mongoose.model("Event", EventSchema);
