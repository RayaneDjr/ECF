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
const scheduleRouter = require("./routes/Schedule");
app.use("/schedule", scheduleRouter);
const bookingsRouter = require("./routes/Bookings");
app.use("/bookings", bookingsRouter);
const usersRouter = require("./routes/Users");
app.use("/users", usersRouter);
const settingsRouter = require("./routes/Settings");
app.use("/settings", settingsRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("server running at port 3001");
  });
});
