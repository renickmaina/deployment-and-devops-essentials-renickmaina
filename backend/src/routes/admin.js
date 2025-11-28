const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/auth");
const Event = require("../models/Events");

// Protect all routes
router.use(adminAuth);

// Create event
router.post("/events", async (req, res) => {
  try {
    const { title, date, venue, bannerImage, ticketTypes } = req.body;

    const newEvent = await Event.create({ title, date, venue, bannerImage, ticketTypes });
    res.status(201).json(newEvent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Update event
router.put("/events/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({message: "Event Updated"});
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete event
router.delete("/events/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
