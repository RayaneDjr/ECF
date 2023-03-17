const express = require("express");
const router = express.Router();
const { Menus } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  try {
    const listOfMenus = await Menus.findAll();
    res.json(listOfMenus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", validateToken, (req, res) => {
  const { title, description, price, when } = req.body;
  if (req.user.role === "admin") {
    Menus.create({
      title,
      description,
      price,
      when,
    })
      .then((menu) => res.json(menu))
      .catch((err) => res.status(500).json({ error: err.message }));
  } else {
    return res.json("not authorized");
  }
});

router.delete("/:id", validateToken, async (req, res) => {
  if (req.user.role === "admin") {
    const id = req.params.id;
    try {
      await Menus.destroy({ where: { id } });
      return res.json("delete succesfull");
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    return res.json("not authorized");
  }
});

module.exports = router;
