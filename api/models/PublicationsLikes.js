module.exports = (sequelize, DataTypes) => {
  const PublicationsLikes = sequelize.define("PublicationsLikes", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    PublicationId: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    UserId: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    state: {
      allowNull: false,
      type: DataTypes.ENUM("liked", "disliked", "nothing"),
      defaultValue: "nothing",
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

  PublicationsLikes.associate = (models) => {
    PublicationsLikes.belongsTo(models.Publications);
  };
  return PublicationsLikes;
};
