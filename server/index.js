const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcryptjs");

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

db.sequelize.sync().then(async () => {
  await db.Schedule.findOrCreate({
    where: {
      day: "lundi",
    },
    defaults: {
      day: "lundi",
      close: true,
    },
  });
  await db.Schedule.findOrCreate({
    where: {
      day: "mardi",
    },
    defaults: {
      day: "mardi",
      close: true,
    },
  });
  await db.Schedule.findOrCreate({
    where: {
      day: "mercredi",
    },
    defaults: {
      day: "mercredi",
      close: true,
    },
  });
  await db.Schedule.findOrCreate({
    where: {
      day: "jeudi",
    },
    defaults: {
      day: "jeudi",
      close: true,
    },
  });
  await db.Schedule.findOrCreate({
    where: {
      day: "vendredi",
    },
    defaults: {
      day: "vendredi",
      close: true,
    },
  });
  await db.Schedule.findOrCreate({
    where: {
      day: "samedi",
    },
    defaults: {
      day: "samedi",
      close: true,
    },
  });
  await db.Schedule.findOrCreate({
    where: {
      day: "dimanche",
    },
    defaults: {
      day: "dimanche",
      close: true,
    },
  });
  bcrypt.hash("Admin@123456", 10).then(async (hash) => {
    await db.Users.findOrCreate({
      where: {
        role: "admin",
      },
      defaults: {
        firstname: "admin",
        lastname: "admin",
        email: "admin@mail.com",
        password: hash,
        role: "admin",
        guests: 0,
      },
    });
  });
  await db.Settings.findOrCreate({
    where: {
      id: 1,
    },
    defaults: {
      id: 1,
      maxGuests: 50,
      timeToEat: 60,
    },
  });
  app.listen(process.env.PORT || 3001, () => {
    console.log("server running at port 3001");
  });
});
