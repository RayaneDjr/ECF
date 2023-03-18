const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const { Bookings } = require("../models");

router.post("/", (req, res) => {
  let { firstname, lastname, email, date, time, guests, allergies, UserId } =
    req.body;
  if (!allergies) allergies = null;
  if (!UserId) UserId = null;
  Bookings.create({
    UserId,
    firstname,
    lastname,
    email,
    date,
    time,
    guests,
    allergies,
  })
    .then((booking) => res.json(booking))
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.get("/:date", async (req, res) => {
  try {
    const day = new Date(req.params.date);
    day.setUTCHours(0, 0, 0, 0);
    const bookings = await Bookings.findAll({
      where: { date: { [Op.eq]: day } },
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
