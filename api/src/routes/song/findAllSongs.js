const { Song } = require('../../db/sequelize')
const { Op } = require('sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
  app.get('/api/songs', auth, (req, res) => {
    if (req.query.terme) {
      const terme = req.query.terme
      const limited = parseInt(req.query.limit) || 5

    if (terme.length < 2) {
      const message = 'Le terme de recherche doit contenir deux caractères au minimum.'
      return res.status(400).json({ message })
    }
      return Song.findAndCountAll({
        where: {
          [Op.or]: [
            {'metadata.title': { [Op.like]: `%${terme}%`}},
            {'metadata.album': { [Op.like]: `%${terme}%`}},
            {'metadata.artist': { [Op.like]: `%${terme}%`}}
          ]
        },
        order: ['metadata.title'],
        limit: limited,
      })
        .then(({count, rows}) => {
          const message = `Il y a ${count} musique qui correspondent au terme recherché ${terme}.`
          res.json({ message, data: rows })
        })
    } else {
      Song.findAll({ order: ['metadata.title'] })
        .then(songs => {
          const message = 'la liste des musique est récupérée.'
          res.json({ message, data: songs })
        })
        .catch(error => {
          const message = `La list de musique demandé n'est pas accessible ou n'a pas put être récupéré. Réessayez dans quelques instants.`
          res.status(500).json({ message, data: error })
        })
    }
  })

}
