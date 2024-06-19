const express = require('express');
const serveur = express();
const port = process.env.PORT || 3000;
const unitOFMeasurementRoutes = require('../routes/unitOfMeasurementRoutes');
const ingredientsRoutes = require('../routes/ingredientRoutes');

function connectToServeur() {

    
    serveur.listen(port, () => {
        console.log(`Serveur lancé sur le port ${port}`);
    });
    serveur.use(express.json());
    
    serveurRoutes();
}

function serveurRoutes() {
    serveur.use('/unit', unitOFMeasurementRoutes); 
    serveur.use('/ingredient', ingredientsRoutes)
}
module.exports = { connectToServeur };
