const { User } = require('../../db/sequelize')
const { Op } = require('sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const bcrypt = require('bcrypt')

module.exports = (app) => {
  app.put('/api/users/reset-password/:token', (req, res) => {
    User.findOne({
      where: {
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {
          [Op.gt]: Date.now()
        }
      }
    })
    .then(user => {
      if (!user) {
        const message = `L'utilisateur demandé n'existe pas.`
        return res.status(404).json({ message })
      } else {
        bcrypt.hash(req.body.password, 10)
        .then(hashedPassword => {
          User.update({ password: hashedPassword }, {
            where: { mail: user.mail }
          })
          .then(() => {
            User.update({
              resetPasswordToken: null,
              resetPasswordExpires: null
            }, {
              where: { mail: user.mail }
            });
            const message = "Votre mot de passe a été mis à jour."
            res.status(200).json({ message })
          })
          .catch(error => {
            if(error instanceof ValidationError){
              return res.status(400).json({ message: error.message, data: error })
            }
            if(error instanceof UniqueConstraintError) {
              return res.status(400).json({ message: error.message, data: error })
            }
            const message = `Votre mot de passe n'a pas pu être modifié. Réessayez dans quelques instants.`
            res.status(500).json({message, data: error})
          });
        })
      }
    })
    .catch(error => {
      if(error instanceof ValidationError){
        return res.status(400).json({ message: error.message, data: error })
      }
      if(error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: error.message, data: error })
      }
      const message = `Votre mot de passe n'a pas pu être modifié. Réessayez dans quelques instants.`
      res.status(500).json({message, data: error})
    });
  });
}
