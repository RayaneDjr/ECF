const express = require("express");
const router = express.Router();
const { Images } = require("../models");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${path.parse(file.originalname).name}_${Date.now()}${path.extname(
        file.originalname
      )}`
    );
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("image"), (req, res) => {
  const { filename, originalname } = req.file;
  Images.create({
    name: originalname,
    filename,
  })
    .then((image) => res.json(image))
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.get("/", async (req, res) => {
  try {
    const images = await Images.findAll();
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const image = await Images.findByPk(id);
    res.sendFile("/uploads/" + image.filename, { root: "." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const image = await Images.findByPk(id);
    fs.unlink(`uploads/${image.filename}`, () => {
      Images.destroy({ where: { id } })
        .then(() => {
          res.json("delete successfull");
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
