const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { firstname, lastname, email, password, guests, allergies } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hash,
      guests: guests,
      allergies: allergies,
    })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json({ error: err }));
  });
});

module.exports = router;
