module.exports = (sequelize, DataTypes) => {
  const Bookings = sequelize.define("Bookings", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    guests: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    allergies: {
      type: DataTypes.STRING,
    },
  });

  Bookings.associate = (models) => {
    Bookings.belongsTo(models.Users, {
      onDelete: "cascade",
    });
  };

  return Bookings;
};
