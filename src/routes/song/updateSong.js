const { Song } = require('../../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
  app.put('/api/songs/:id', auth, (req, res) => {
    const id = req.params.id
    Song.update(req.body, {
      where: {id: id}
    })
    .then(_ => {
      return Song.findByPk(id)
      .then(song => {
        if(song === null) {
          const message = 'La musique demandé n\'existe pas. Ressayez avec un autre identifiant.'
          return res.status(404).json({message})
        }
        const message = `Musique ${song.metadata.title} mise à jour.`
        res.json({ message, data: song })
      })
     })
    .catch(error => {
      if(error instanceof ValidationError){
        return res.status(400).json({ message: error.message, data: error })
      }
      if(error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: error.message, data: error })
      }
      const message = `La musique demandé n'a pas pu être modifié. Réessayez dans quelques instants.`
      res.status(500).json({message, data: error})
    })
  })
}
