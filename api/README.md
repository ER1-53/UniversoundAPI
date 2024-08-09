*Installation sur une version Ubuntu 22.04(linux)*

**MYSQL**

****1. Avant d'installer MySQL, assurez-vous que votre système est à jour :****

```
sudo apt update
sudo apt upgrade
```

****2. Installer MySQL****

Pour installer MySQL sur Ubuntu ou Debian, utilisez la commande suivante :

```
sudo apt install mysql-server
```

****3. Sécuriser l'installation de MySQL****

Après l'installation, il est recommandé d'exécuter le script de sécurité inclus pour améliorer la sécurité de votre installation MySQL :

```
sudo mysql_secure_installation
```

Ce script vous demandera de définir un mot de passe root (pour MySQL), de supprimer les utilisateurs anonymes, d'interdire les connexions root à distance, et de supprimer la base de données de test. Répondez aux questions selon vos besoins. Par défaut, il est recommandé de répondre par "oui" (y) à la plupart des questions pour sécuriser l'installation.
****4. Vérifier l'installation de MySQL****

Après avoir sécurisé votre installation, vous pouvez vérifier si le service MySQL fonctionne correctement :

```
sudo systemctl status mysql
```

Cette commande devrait afficher un statut indiquant que MySQL est actif (running).

****5. Se connecter à MySQL****

Pour se connecter à MySQL en tant qu'utilisateur root (administrateur), utilisez la commande suivante :

```
sudo mysql
```

Vous pouvez maintenant exécuter des commandes SQL dans le terminal MySQL.

****6. Créer un utilisateur MySQL (Optionnel)****

Il est souvent recommandé de créer un utilisateur MySQL distinct pour les tâches quotidiennes au lieu d'utiliser le compte root. Voici comment créer un utilisateur et lui donner des privilèges :

sql
```
CREATE USER 'universound'@'localhost' IDENTIFIED BY 'universoundHolberton';
GRANT ALL PRIVILEGES ON *.* TO 'universound'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

****7. Configurer MySQL pour démarrer automatiquement (Optionnel)****

Pour que MySQL démarre automatiquement au démarrage de votre système, assurez-vous que le service est activé :

```
sudo systemctl enable mysql
```

****8. (Optionnel) Ouvrir MySQL pour les connexions à distance****

Si vous avez besoin d'accéder à MySQL depuis une autre machine, vous devrez modifier la configuration pour autoriser les connexions distantes.

    Éditez le fichier de configuration MySQL :

```
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
```

Trouvez la ligne suivante et commentez-la (ajoutez un # au début) ou changez 127.0.0.1 en 0.0.0.0 pour permettre l'accès à distance :

css
```
bind-address = 127.0.0.1
```

Redémarrez le service MySQL pour appliquer les changements :

```
sudo systemctl restart mysql
```

N'oubliez pas de configurer votre pare-feu pour autoriser les connexions sur le port 3306 (le port par défaut de MySQL) si nécessaire.

****9. Créer la database universoundDB****

```
CREATE DATABASE universoundDB;
```

****10. Installer CURL****

```
sudo apt install curl
```

****11. Installer node version manager (NVM)****

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```
****12. Cette application fonctionne sous node 16****

Utiliser nvm pour installer et utiliser node 16

```
nvm install 16
nvm use 16
```
****13. Installer l'API****

Dans le dossier api :

```
npm install
```

Pour continuer le développement :

```
npm run dev
```
