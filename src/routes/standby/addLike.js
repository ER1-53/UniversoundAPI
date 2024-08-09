const auth = require('../auth/auth')


module.exports = (app) => {
  app.post('/api/users/:UserId/songs/:SongId', auth, async (req, res) => {
    const user = await User.findByPk(req.params.UserId);
    const song = await Song.findByPk(req.params.SongId);
    await user.addSong(song);
    res.json({ message: 'Musique ajouter avec succès.' });
  });
}
