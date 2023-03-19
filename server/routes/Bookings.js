const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const { Bookings } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

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

router.put("/:id", validateToken, (req, res) => {
  const id = req.params.id;
  let { firstname, lastname, email, date, time, guests, allergies } = req.body;
  if (!allergies) allergies = null;
  Bookings.update(
    {
      firstname,
      lastname,
      email,
      date,
      time,
      guests,
      allergies,
    },
    { where: { id } }
  )
    .then(() => res.json("yesss"))
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.get("/byDate/:date", async (req, res) => {
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

router.get("/byUserId/:UserId", validateToken, async (req, res) => {
  try {
    const UserId = req.params.UserId;
    const bookings = await Bookings.findAll({ where: { UserId } });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/byId/:id", validateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const bookings = await Bookings.findByPk(id);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  if (req.user.role === "admin" || req.user.id === id) {
    try {
      await Bookings.destroy({ where: { id } });
      res.json("delete succesfull");
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    return res.json("not authorized");
  }
});

module.exports = router;
