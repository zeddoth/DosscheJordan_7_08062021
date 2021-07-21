const db = require("../models");

module.exports = (sequelize, DataTypes) => {
  const Publications = sequelize.define("Publications", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    UserId: {
      allowNull: false,
      foreignKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    attachment: {
      allowNull: true,
      type: DataTypes.STRING(120),
    },
    like: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.INTEGER,
    },
    dislike: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.INTEGER,
    },
    comment: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.INTEGER,
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

  Publications.associate = (models) => {
    Publications.belongsTo(models.Users, {
      foreignKey: {
        allowNull: true,
      },
    });
    Publications.hasMany(models.Comments, {
      onDelete: "cascade",
    });
    Publications.hasMany(models.PublicationsLikes, {
      onDelete: "cascade",
    });
  };

  return Publications;
};
