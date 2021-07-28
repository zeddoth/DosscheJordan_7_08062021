module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    roles: {
      allowNull: false,
      defaultValue: "user",
      type: DataTypes.ENUM("admin", "user"),
    },
    username: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(255),
    },
    profileImage: {
      allowNull: true,
      type: DataTypes.STRING(255),
    },
    email: {
      unique: true,
      allowNull: true,
      type: DataTypes.STRING(50),
    },
    lastName: {
      allowNull: true,
      type: DataTypes.STRING(50),
    },
    firstName: {
      allowNull: true,
      type: DataTypes.STRING(50),
    },
    job: {
      allowNull: true,
      type: DataTypes.STRING(50),
    },
    birthday: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Publications, { onDelete: "CASCADE", hooks: true });
    Users.hasMany(models.Comments, { onDelete: "CASCADE", hooks: true });
  };

  return Users;
};
