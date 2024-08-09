const { Song } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
  app.delete('/api/songs/:id', auth, (req, res) => {
    Song.findByPk(req.params.id)
    .then(song => {
      if(song === null) {
        const message = 'La musique demandé n\'existe pas. Ressayez avec un autre identifiant.'
        return res.status(404).json({message})
      }

      const songDeleted = song;
      return Song.destroy({
        where: {id: song.id}
      })
    .then(_ => {
      const message = `La musique ${songDeleted.metadata.title} avec l'identifiant ${songDeleted.id} est supprimé.`
      res.json({ message, data: songDeleted })
    })
    })
    .catch(error => {
      const message = `La musique demandé n'a pas pu être supprimé. Réessayez dans quelques instants.`
      res.status(500).json({message, data: error})
    })
  })
}
