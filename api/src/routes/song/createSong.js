const { Song } = require('../../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../../auth/auth')


module.exports = (app) => {
  app.post('/api/songs', auth, (req, res) => {
    Song.create(req.body)
    .then(song => {
      const message = `La musique ${req.body.metadata.title} a été crée.`
      res.json({ message, data: song })
    })
    .catch(error => {
      if(error instanceof ValidationError){
        return res.status(400).json({ message: error.message, data: error })
      }
      if(error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: error.message, data: error })
      }
      const message = `La musique demandé n'a pas put être ajouté. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
  })
}
