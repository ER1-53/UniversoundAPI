const { Song } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
  app.get('/api/songs/:id', auth, (req, res) => {
    Song.findByPk(req.params.id)
    .then(song => {
      const message = 'Musique trouvé.'
      res.json({ message, data: song })
    })
    .catch(error => {
      const message = `La musique demandé n'est pas accessible ou n'a pas put être récupéré. Réessayez dans quelques instants.`
      res.status(500).json({message, data: error})
    })
  })
}
