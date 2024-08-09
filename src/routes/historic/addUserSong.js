const { User, Song, Historic } = require('../../db/sequelize');
const auth = require('../../auth/auth');

module.exports = (app) => {
  app.post('/api/historic/:UserId/songs/:SongId', auth, async (req, res) => {
    const { UserId, SongId } = req.params;
    const existingRecord = await Historic.findOne({ where: { UserId: UserId, SongId: SongId } });

    if (existingRecord) {
      console.log('User-song pair already exists in the Historics table.');
      return;
    }

    if (!UserId || !SongId || isNaN(parseInt(UserId)) || isNaN(parseInt(SongId))) {
      return res.status(400).json({ message: 'Identifiant d\'utilisateur ou de chanson invalide.' });
    }

    const user = await User.findByPk(UserId);
    const song = await Song.findByPk(SongId);

    if (!user || !song) {
      return res.status(404).json({ message: 'Utilisateur ou chanson introuvable.' });
    }

    await Historic.create({ UserId, SongId });
    await user.addSong(song);
    res.json({ message: 'Chanson ajoutée avec succès.' });
  });
};
