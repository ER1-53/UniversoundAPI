const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const like = sequelize.define('like', {
      like_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
      },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    SongId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Song',
        key: 'id',
      },
    },
  }, {
    timestamps: false,
  });

  like.associate = (models) => {
    like.belongsTo(models.User, { foreignKey: 'UserId', onDelete: 'CASCADE' });
    like.belongsTo(models.Song, { foreignKey: 'SongId', onDelete: 'CASCADE' });
  };

  return like;
};
