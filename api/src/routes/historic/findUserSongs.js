const { User, Song, Historic } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
  app.get('/api/users/:id/songs', auth, async (req, res) => {
    try {

      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).send({ error: "L'utilisateur n'existe pas." });
      }

      const songs = await user.getSongs();

      res.status(200).send({data: songs});
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Server error' });
    }
  });
}
