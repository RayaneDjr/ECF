module.exports = (sequelize, DataTypes) => {
  const Images = sequelize.define("Images", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Images;
};
