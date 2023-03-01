module.exports = (sequelize, DataTypes) => {
  const Menus = sequelize.define("Menus", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    when: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Menus;
};
