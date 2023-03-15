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
  if (user) return res.json({ error: "Cet addresse email est déjà utilisée" });
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
    return res.json({ error: "Mot de passe ou addresse email invalide" });

  bcrypt.compare(password, user.password).then((match) => {
    if (!match)
      return res.json({ error: "Mot de passe ou addresse email invalide" });
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

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
