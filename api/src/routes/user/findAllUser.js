const { User } = require('../../db/sequelize')
const { Op } = require('sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
  app.get('/api/users', auth, (req, res) => {
    if (req.query.terme) {
      const terme = req.query.terme
      const limited = parseInt(req.query.limit) || 5

    if (terme.length < 2) {
      const message = 'Le terme de recherche doit contenir deux caractères au minimum.'
      return res.status(400).json({ message })
    }
      return User.findAndCountAll({
        where: {
          [Op.or]: [
            {'username': { [Op.like]: `%${terme}%`}},
            {'mail': { [Op.like]: `%${terme}%`}},
          ]
        },
        order: ['username'],
        limit: limited,
      })
        .then(({count, rows}) => {
          const message = `Il y a ${count} utilisateurs qui correspondent au terme recherché ${terme}.`
          res.json({ message, data: rows })
        })
    } else {
      User.findAll({ order: ['username'] })
        .then(users => {
          const message = 'la liste des utilisateur est récupérée.'
          console.log(`je suis dans findAllUser : ${data}`)
          res.json({ message, data: users })
        })
        .catch(error => {
          const message = `La list d\'utilisateur demandé n'est pas accessible ou n'a pas put être récupéré. Réessayez dans quelques instants.`
          res.status(500).json({ message, data: error })
        })
    }
  })

}
