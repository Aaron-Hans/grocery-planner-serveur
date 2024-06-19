require('dotenv').config();
const mongoose = require('mongoose')

async function connectToTheDataBase() {
    try{
        await mongoose.connect(process.env.DATABASE_URI);
        console.log('Connexion ok')
    } catch (error) {
        console.error(error)
    }
    
}

module.exports = {connectToTheDataBase}