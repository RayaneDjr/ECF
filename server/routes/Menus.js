const express = require("express");
const router = express.Router();
const { Menus } = require("../models");

router.get("/", async (req, res) => {
  try {
    const listOfMenus = await Menus.findAll();
    res.json(listOfMenus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", (req, res) => {
  const { title, description, price, when } = req.body;
  Menus.create({
    title,
    description,
    price,
    when,
  })
    .then((menu) => res.json(menu))
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await Menus.destroy({ where: { id } });
  res.json("delete succesfull");
});

module.exports = router;
