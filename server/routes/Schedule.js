const express = require("express");
const router = express.Router();
const { Schedule } = require("../models");

router.get("/", async (req, res) => {
  try {
    const schedule = await Schedule.findAll();
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
