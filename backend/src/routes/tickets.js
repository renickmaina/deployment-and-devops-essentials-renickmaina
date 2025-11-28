// routes/tickets.js
const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");
const QRCode = require("qrcode");

// Purchase ticket
router.post("/purchase", async (req, res) => {
  try {
    const { eventId, buyerName, buyerEmail, buyerPhone, tickets } = req.body;

    const totalAmount = tickets.reduce(
      (acc, t) => acc + t.price * t.quantity,
      0
    );

    const newTicket = await Ticket.create({
      buyerName,
      buyerEmail,
      buyerPhone,
      eventId,
      ticketsPurchased: tickets,
      totalAmount,
    });

    // Generate QR code
    const qrData = JSON.stringify({ ticketId: newTicket._id });
    const qrCodeUrl = await QRCode.toDataURL(qrData);

    newTicket.qrCode = qrCodeUrl;
    await newTicket.save();

    res.json(newTicket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ NEW: Get single ticket by ID
router.get("/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.json(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
