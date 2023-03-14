module.exports = (sequelize, Datatypes) => {
  const Bookings = sequelize.define("Bookings", {
    firstname: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    email: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    date: {
      type: Datatypes.DATE,
      allowNull: false,
    },
    time: {
      type: Datatypes.TIME,
      allowNull: false,
    },
    guests: {
      type: Datatypes.INTEGER,
    },
    allergies: {
      type: Datatypes.STRING,
    },
  });

  Bookings.associate = (models) => {
    Bookings.belongsTo(models.Users, {
      onDelete: "cascade",
    });
  };

  return Bookings;
};
