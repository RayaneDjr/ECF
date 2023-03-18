const express = require("express");
const router = express.Router();
const { Schedule } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  try {
    const schedule = await Schedule.findAll();
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/", validateToken, async (req, res) => {
  if (req.user.role === "admin") {
    const data = req.body;
    for (const value in data) {
      if (!data[value]) {
        data[value] = null;
      }
    }
    if (
      (data.morningOpeningTime && !data.morningClosingTime) ||
      (!data.morningOpeningTime && data.morningClosingTime) ||
      (data.eveningOpeningTime && !data.eveningClosingTime) ||
      (!data.eveningOpeningTime && data.eveningClosingTime) ||
      (data.allDayOpeningTime && !data.allDayClosingTime) ||
      (!data.allDayOpeningTime && data.allDayClosingTime) ||
      (data.morningOpeningTime && !data.eveningOpeningTime) ||
      (!data.morningOpeningTime && data.eveningOpeningTime) ||
      (data.morningOpeningTime && data.close) ||
      (data.eveningOpeningTime && data.close) ||
      (data.allDayOpeningTime && data.close)
    ) {
      return res.status(500).json({ error: "Don't try that!" });
    }
    Schedule.update(
      {
        morningOpeningTime: data.morningOpeningTime,
        morningClosingTime: data.morningClosingTime,
        eveningOpeningTime: data.eveningOpeningTime,
        eveningClosingTime: data.eveningClosingTime,
        allDayOpeningTime: data.allDayOpeningTime,
        allDayClosingTime: data.allDayClosingTime,
        close: data.close,
      },
      { where: { day: data.day } }
    )
      .then(async () => {
        res.json("success");
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } else {
    return res.json("not authorized");
  }
});

module.exports = router;
