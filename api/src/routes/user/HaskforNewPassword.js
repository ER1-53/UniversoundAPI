const crypto = require('crypto');
const { User } = require('../../db/sequelize')
const nodemailer = require('nodemailer');
const { ValidationError, UniqueConstraintError } = require('sequelize')

let transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 587,
  auth: {
    user: 'erwan@universound.fr',
    pass: 'Amazinger53*'
  }
});
module.exports = (app) => {
app.post('/api/users/reset-password', (req, res) => {
  const resetPasswordToken = crypto.randomBytes(20).toString('hex');

  User.update({
    resetPasswordToken,
    resetPasswordExpires: Date.now() + 3600000
  }, {
    where: { mail: req.body.mail }
  })
  .then(() => {
    let mailOptions = {
      from: 'erwan@universound.fr', // Remplacez par votre adresse e-mail
      to: req.body.mail,
      subject: 'Réinitialisation du mot de passe',
      text: 'Pour réinitialiser votre mot de passe, veuillez cliquer sur le lien suivant : \n\n' +
            `http://localhost:3000/renewPassPage/${resetPasswordToken}`
    };

    // Envoyer l'e-mail
    transporter.sendMail(mailOptions, (error, response) => {
      if (error) {
        console.error('Il y a eu une erreur : ', error);
      } else {
        console.log('Voici la réponse : ', response);
        res.status(200).json({message: 'Récupération du mot de passe envoyée avec succès', token: resetPasswordToken});
      }
    });
  })
  .catch(error => {
    if(error instanceof ValidationError){
      return res.status(400).json({ message: error.message, data: error })
    }
    if(error instanceof UniqueConstraintError) {
      return res.status(400).json({ message: error.message, data: error })
    }
    const message = `Nous n'avons pas pu envoyé votre renouvellement de mot de passe. Réessayez dans quelques instants.`
    res.status(500).json({message, data: error})
  });
});
}
