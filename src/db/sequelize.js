const { Sequelize, DataTypes } = require('sequelize')
const LikeModel = require('../models/like')
const HistoricModel = require('../models/historic')
const SongModel = require('../models/song')
const UserModel = require('../models/user')
const likesData = require('./mock-like')
const historicData = require('./mock-historic')
const songsData = require('./mock-song')
const usersData = require('./mock-user')
const bcrypt = require('bcrypt')
require('dotenv').config();

console.log(process.env.USER);
// Define Sequelize instance based on environment
let sequelize

if(process.env.NODE_ENV === 'production'){
  // Production environment configuration
  sequelize = new Sequelize(process.env.MYSQL_ADDON_DB, process.env.MYSQL_ADDON_USER, process.env.MYSQL_ADDON_PASSWORD, {
    host: process.env.MYSQL_ADDON_HOST,
    dialect: 'mysql',
    logging: true,
  });
} else {
  // Configuration pour l'environnement de développement
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  });
}

// Define Sequelize models for Song, User, Historic, and Like
const Song = SongModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
const Historic = HistoricModel(sequelize, DataTypes)
const Like = LikeModel(sequelize, DataTypes)

// Define many-to-many relationships between models
User.belongsToMany(Song, { through: Historic, foreignKey: 'UserId' });
Song.belongsToMany(User, { through: Historic, foreignKey: 'SongId' });

User.belongsToMany(Song, { through: Like, foreignKey: 'UserId' });
Song.belongsToMany(User, { through: Like, foreignKey: 'SongId' });

// Function to initialize the database
const initDB = async () => {

  // Synchronize database schema with models (create tables if necessary)
  await sequelize.sync();

  // Check if tables are empty
  const count = await Song.count();
  const countUser = await User.count();

  if(count === 0 && countUser === 0) {
    // If tables are empty, populate them with mock data

    // Create songs from mock data
    await Promise.all(songsData.map(songData => {
      Song.create({
        audioSrc: songData.audioSrc,
        metadata: {
          album: songData.metadata.album,
          artist: songData.metadata.artist,
          coverArtSrc: songData.metadata.coverArtSrc,
          types: songData.metadata.types,
          title: songData.metadata.title,
          },
      })
      .then(song => console.log(song.toJSON()))
      .catch(error => console.error(error));
    }));

    // Create users from mock data with hashed passwords
    await Promise.all(usersData.map(async userData => {
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      User.create({
          lastname: userData.lastname,
          firstname: userData.firstname,
          username: userData.username,
          password: hashedPassword,
          mail: userData.mail,
          resetPasswordToken: userData.resetPasswordToken,
          resetPasswordExpires: userData.resetPasswordExpires,
      })
      .then(user => console.log(user.toJSON()))
      .catch(error => console.error('Erreur lors de la création de l\'utilisateur :', error));
    }));

    // Create historic entries from mock data
    historicData.map(historicData => {
      Historic.create ({
        UserId: historicData.UserId,
        SongId: historicData.SongId,
        listenedAt: historicData.listenedAt,
      })
      .then(historic => console.log(historic.toJSON()))
      .catch(error => console.error('Erreur lors de la création de Historic', error))
      });

      // Create like entries from mock data (assuming similar structure as historic)
      likesData.map(likesData => {
        Like.create ({
          UserId: likesData.UserId,
          SongId: likesData.SongId,
          listenedAt: likesData.listenedAt,
        })
        .then(historic => console.log(historic.toJSON()))
        .catch(error => console.error('Erreur lors de la création de Historic', error))
        });

    } else {
      console.log('La base de données universoundDB est synchronisée.')
      console.log(`Base de données déjà remplie.`)
    }
}

module.exports = { initDB, Song, User, Historic, Like}
