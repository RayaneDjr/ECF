const express = require("express");
const router = express.Router();
const { Settings } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  try {
    const settings = await Settings.findAll();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/", validateToken, (req, res) => {
  if (req.user.role === "admin") {
    const { maxGuests, timeToEat } = req.body;
    Settings.update({ maxGuests, timeToEat }, { where: { id: 1 } }).then(
      async () => {
        const settings = await Settings.findAll();
        res.json(settings);
      }
    );
  } else {
    return res.status(500).json("not authorized");
  }
});

module.exports = router;
