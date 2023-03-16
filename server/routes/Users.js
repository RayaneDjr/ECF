const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", async (req, res) => {
  const { firstname, lastname, email, password, role, guests, allergies } =
    req.body;
  const user = await Users.findOne({ where: { email } });
  if (user) return res.json({ error: "Cet adresse email est déjà utilisée" });
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      firstname,
      lastname,
      email,
      password: hash,
      role,
      guests,
      allergies,
    })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json({ error: err }));
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email } });

  if (!user)
    return res.json({ error: "Mot de passe ou adresse email invalide" });

  bcrypt.compare(password, user.password).then((match) => {
    if (!match)
      return res.json({ error: "Mot de passe ou adresse email invalide" });
    const accessToken = sign(
      {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        guests: user.guests,
        allergies: user.allergies,
      },
      "importantSecret"
    );
    return res.json({
      token: accessToken,
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      guests: user.guests,
      allergies: user.allergies,
    });
  });
});

router.put("/update", validateToken, async (req, res) => {
  let {
    oldPassword,
    newPassword,
    firstname,
    lastname,
    email,
    guests,
    allergies,
  } = req.body;
  if (!allergies) allergies = null;
  const user = await Users.findOne({ where: { id: req.user.id } });
  const accessToken = sign(
    {
      id: req.user.id,
      firstname,
      lastname,
      email,
      role: req.user.role,
      guests,
      allergies,
    },
    "importantSecret"
  );
  bcrypt.compare(oldPassword, user.password).then((match) => {
    if (!match) {
      return res.json({ error: "Mauvais mot de passe" });
    }
    if (newPassword) {
      bcrypt.hash(newPassword, 10).then((hash) => {
        Users.update(
          { firstname, lastname, email, guests, allergies, password: hash },
          { where: { id: req.user.id } }
        )
          .then(() => {
            return res.json({
              token: accessToken,
              id: req.user.id,
              firstname,
              lastname,
              email,
              role: req.user.role,
              guests,
              allergies,
            });
          })
          .catch((err) => {
            return res.status(500).json({ error: err });
          });
      });
    } else {
      Users.update(
        { firstname, lastname, email, guests, allergies },
        { where: { id: req.user.id } }
      )
        .then(() => {
          return res.json({
            token: accessToken,
            id: req.user.id,
            firstname,
            lastname,
            email,
            role: req.user.role,
            guests,
            allergies,
          });
        })
        .catch((err) => {
          return res.status(500).json({ error: err });
        });
    }
  });
});

module.exports = router;
