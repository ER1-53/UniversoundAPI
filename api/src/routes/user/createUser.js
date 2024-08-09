const { User } = require('../../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const bcrypt = require('bcrypt')

module.exports = (app) => {
  app.post('/api/users', (req, res) => {
    bcrypt.hash(req.body.password, 10)
    .then(hashedPassword => {
      req.body.password = hashedPassword
      return User.create(req.body)
    })
    .then(user => {
      const message = `Bienvenue ${req.body.username} !`
      res.json({message, data: user})
    })
    .catch(error => {
      if(error instanceof ValidationError){
        return res.status(400).json({ message: error.message, data: error })
      }
      if(error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: error.message, data: error })
      }
      const message = `Nous n'avons pas pu créer votre compte. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error})
    })
  })
}
