const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequelize');
const cors = require('cors')

const app = express();
const PORT = process.env.MYSQL_ADDON_PORT || 4001;

app
.use(favicon(__dirname + '/favicon.ico'))
.use(bodyParser.json())
.use(cors())

sequelize.initDB()

app.get('/', (req, res) => {
  res.json('Good connect !')
})

//Routes song
require('./src/routes/song/findAllSongs')(app)
require('./src/routes/song/findSongByPk')(app)
require('./src/routes/song/createSong')(app)
require('./src/routes/song/updateSong')(app)
require('./src/routes/song/deleteSong')(app)

//Routes user
require('./src/routes/user/login')(app)
require('./src/routes/user/createUser')(app)
require('./src/routes/user/deleteUser')(app)
require('./src/routes/user/HaskforNewPassword')(app)
require('./src/routes/user/updatePassword')(app)
require('./src/routes/user/finUserByMail')(app)

//Routes historic
require('./src/routes/historic/findUserSongs')(app)
require('./src/routes/historic/addUserSong')(app)


app.use(({res}) => {
  const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'
  res.status(404).json({message})
})

app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});

