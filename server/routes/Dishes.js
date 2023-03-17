const express = require("express");
const router = express.Router();
const { Dishes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  try {
    const listOfDishes = await Dishes.findAll();
    res.json(listOfDishes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", validateToken, (req, res) => {
  const { title, description, price, category } = req.body;
  if (req.user.role === "admin") {
    Dishes.create({
      title,
      description,
      price,
      category,
    })
      .then((dish) => res.json(dish))
      .catch((err) => res.status(500).json({ error: err.message }));
  } else {
    return res.json("not authorized");
  }
});

router.delete("/:id", validateToken, async (req, res) => {
  if (req.user.role === "admin") {
    const id = req.params.id;
    try {
      await Dishes.destroy({ where: { id } });
      res.json("delete succesfull");
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    return res.json("not authorized");
  }
});

module.exports = router;
