const express = require("express");
const Complaint = require("../Models/Complaint.js");

const router = express.Router();

// Create a new complaint
router.post("/dashboard", async (req, res) => {
  const { text } = req.body;
  try {
    const newComplaint = new Complaint({ text, user: req.user.id });
    await newComplaint.save();
    res.status(201).json(newComplaint);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all complaints
router.get("/dashboard", async (req, res) => {
  try {
    const complaints = await Complaint.find().populate("user", "email");
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Upvote or downvote a complaint
router.post("/dashboard/:id/vote", async (req, res) => {
  const { vote } = req.body; // +1 for upvote, -1 for downvote
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    complaint.votes += vote;
    await complaint.save();
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
