//models/Ticket.js
const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  buyerName: { type: String, required: true },
  buyerEmail: String,
  buyerPhone: String,
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  ticketsPurchased: [
    { ticketType: String, quantity: Number, price: Number }
  ],
  totalAmount: Number,
  qrCode: String,
  status: { type: String, default: "valid" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Ticket", TicketSchema);
