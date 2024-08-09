const { User } = require('../../db/sequelize'); // Importation du modèle User depuis le fichier ../db/sequelize
module.exports = (app) =>
  app.get('/api/users/:mail', async (req, res) => {
    const userMail = req.params.mail;
    try {
      const user = await User.findOne({ where: { mail: userMail } });
      if (user) {
        const message = 'Utilisateur trouvé.';
        res.json({ message, data: user });
      } else {
        const message = `L'utilisateur avec l'adresse e-mail ${userMail} n'a pas été trouvé.`;
        res.status(404).json({ message });
      }
    } catch (error) {
      const message = `Erreur lors de la recherche de l'utilisateur : ${error}`;
      res.status(500).json({ message, data: error });
    }
});
