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
