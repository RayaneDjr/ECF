const express = require("express");
const router = express.Router();
const { Dishes } = require("../models");

router.get("/", async (req, res) => {
  try {
    const listOfDishes = await Dishes.findAll();
    res.json(listOfDishes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", (req, res) => {
  const { title, description, price, category } = req.body;
  Dishes.create({
    title,
    description,
    price,
    category,
  })
    .then((dish) => res.json(dish))
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Dishes.destroy({ where: { id } });
    res.json("delete succesfull");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
