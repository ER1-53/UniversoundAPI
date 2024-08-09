const validTypes = ['Pop', 'Rock', 'Electro', 'Classique', 'Funk', 'Rap', 'Blues', 'Dance', 'HardRock', 'Country', 'Jazz', 'Hip-Hop', 'Reggae', 'RnB', 'Jazz', 'Electro', 'Techno','Metal', 'Chanson Française' ];

module.exports = (sequelize, Datatypes) => {
  return sequelize.define('Song', {
    id: {
    type: Datatypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },
    audioSrc: {
    type: Datatypes.STRING,
    allowNull: false,
    unique: {
      msg: 'Cette musique existe déjà.'
    },
    validate: {
      notNull: { msg: 'les champs ne peuvent pas être vide.' },
      notEmpty: { msg: 'Vous devez remplir chaque.' }
      }
  },
    metadata: {
    type: Datatypes.JSON,
    allowNull: false,
    validate: {
      isMetadataValidate(value) {
        if(typeof value !=='object') {
          throw new Error('Metadata doit être un objet JSON.');
        }
        if(!value.album || typeof value.album !== 'string') {
          throw new Error('Le champ album ne peut pas être vide et doit être une chaîne de caractère');
        }
        if(!value.title || typeof value.title !== 'string') {
          throw new Error('Le champ title ne peut pas être vide et doit être une chaîne de caractère');
        }
        if(!value.artist || typeof value.artist !== 'string') {
          throw new Error('Le champ artist ne peut pas être vide et doit être une chaîne de caractère');
        }
        if(!value.coverArtSrc || typeof value.album !== 'string') {
          throw new Error('Le champ cover ne peut pas être vide et doit être une url.');
        }
        if(!value.types) {
          throw new Error('Le champ types doit avoir un type minimum.');
        }
        if(value.types.length > 3) {
          throw new Error('Le champ ne peut contenir que 3 types maximum.');
        }
        value.types.forEach(type => {
          if(!validTypes.includes(type)) {
            throw new Error(`Le type d'une musique doit appartenir à la list suivante : ${validTypes} `)
          }
        });
      }
    }
  }
  }, {
    timestamps: true,
    dialectOptions: {
      collate: 'utf8mb4_general_ci',
    },
});
}
