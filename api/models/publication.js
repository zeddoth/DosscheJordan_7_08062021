"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class publication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.belongsTo(models.publication, {
        foreignKey: {
          allowNull: true,
        },
      });
      models.comment.belongsTo(models.publication, {
        foreignKey: {
          allowNull: true,
        },
      });
    }
  }
  publication.init(
    {
      title: DataTypes.STRING(50),
      content: DataTypes.TEXT,
      attachment: DataTypes.STRING(120),
      like: DataTypes.INTEGER,
      dislike: DataTypes.INTEGER,
      authorID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "publication",
    }
  );
  return publication;
};
