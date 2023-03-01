module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define("Schedule", {
    day: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    morningOpeningTime: {
      type: DataTypes.TIME,
    },
    morningClosingTime: {
      type: DataTypes.TIME,
    },
    eveningOpeningTime: {
      type: DataTypes.TIME,
    },
    eveningClosingTime: {
      type: DataTypes.TIME,
    },
    allDayOpeningTime: {
      type: DataTypes.TIME,
    },
    allDayClosingTime: {
      type: DataTypes.TIME,
    },
    close: {
      type: DataTypes.BOOLEAN,
    },
  });

  return Schedule;
};
