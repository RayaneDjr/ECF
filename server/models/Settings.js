module.exports = (sequelize, DataTypes) => {
  const Settings = sequelize.define("Settings", {
    maxGuests: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 50,
    },
    timeToEat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 60,
    },
  });

  return Settings;
};
