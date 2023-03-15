const express = require("express");
const router = express.Router();
const { Bookings } = require("../models");

router.post("/", (req, res) => {
  const { firstname, lastname, email, date, time, guests, allergies, UserId } =
    req.body;
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

module.exports = router;
