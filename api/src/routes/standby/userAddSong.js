const { User, Song } = require('../db/sequelize')
const auth = require('../auth/auth')


module.exports = (app) => {
  app.post('/api/users/:UserId/songs/:SongId', auth, async (req, res) => {
    const user = await User.findByPk(req.params.UserId);
    const song = await Song.findByPk(req.params.SongId);
    await user.addSong(song);
    res.json({ message: 'Musique ajouter avec succès.' });
  });
}
/* module.exports = (app) => {
  app.post('/api/users/:userId/songs/:songSd', auth, (req, res) => {
    User.findByPk(req.params.userId)
      .then(user => {
        const songId = Song.findByPk(req.params.songId);

        if (user && songId) {
          return user.addSong(songId)
            .then(() => {
              const message = `La musique a été ajoutée à l'utilisateur avec succès.`;
              res.json({ message, data: user });
            })
            .catch(error => {
              const message = `Erreur lors de l'ajout de la musique à l'utilisateur : ${error}`;
              res.status(500).json({ message, data: error });
            });
        } else {
          const message = `L'utilisateur ou l'ID de la musique n'a pas été fourni.`;
          res.status(400).json({ message, data: null });

        }
      })
      .catch(error => {
        const message = `L'utilisateur demandé n'est pas accessible ou n'a pas put être récupéré. Réessayez dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
} */
