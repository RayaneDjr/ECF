const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

const dishesRouter = require("./routes/Dishes");
app.use("/dishes", dishesRouter);
const menusRouter = require("./routes/Menus");
app.use("/menus", menusRouter);
const imagesRouter = require("./routes/Images");
app.use("/images", imagesRouter);

// app.use(express.static(__dirname + "/public"));

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("server running at port 3001");
  });
});
