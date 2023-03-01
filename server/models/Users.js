module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "customer",
    },
    guests: {
      type: DataTypes.INTEGER,
    },
    allergies: {
      type: DataTypes.STRING,
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Bookings, {
      onDelete: "cascade",
    });
  };

  return Users;
};
