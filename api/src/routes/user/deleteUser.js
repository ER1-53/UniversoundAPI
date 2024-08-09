const { User } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
  app.delete('/api/users/:id', auth, (req, res) => {
    User.findByPk(req.params.id)
    .then(user => {
      if(user === null) {
        const message = 'La musique demandé n\'existe pas. Ressayez avec un autre identifiant.'
        return res.status(404).json({message})
      }

      const userDeleted = user;
      return user.destroy({
        where: {id: user.id}
      })
    .then(_ => {
      const message = `${userDeleted.username} votre compte est bien supprimé.`
      res.json({ message, data: userDeleted })
    })
    })
    .catch(error => {
      const message = `Votre compte n'a pas pu être supprimé. Réessayez dans quelques instants.`
      res.status(500).json({message, data: error})
    })
  })
}
