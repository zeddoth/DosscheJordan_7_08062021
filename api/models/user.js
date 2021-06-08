"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.hasMany(models.publication);
    }
  }
  user.init(
    {
      roles: DataTypes.ENUM("admin", "user"),
      username: DataTypes.STRING(50),
      password: DataTypes.STRING(50),
      email: DataTypes.STRING(50),
      lastName: DataTypes.STRING(50),
      firstName: DataTypes.STRING(50),
      job: DataTypes.STRING(50),
      birthday: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
