const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Historic = sequelize.define('Historic', {
    historic_id: {
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

  Historic.associate = (models) => {
    Historic.belongsTo(models.User, { foreignKey: 'UserId', onDelete: 'CASCADE' });
    Historic.belongsTo(models.Song, { foreignKey: 'SongId', onDelete: 'CASCADE' });
  };

  return Historic;
};
