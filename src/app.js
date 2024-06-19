const mongoose = require('./config/connect-database');
const serveur = require('./config/connect-serveur')

mongoose.connectToTheDataBase();
serveur.connectToServeur();