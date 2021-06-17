module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("Comments", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT,
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

  Comments.associate = (models) => {
    Comments.belongsTo(models.Publications);
    Comments.belongsTo(models.Users);
  };

  return Comments;
};
