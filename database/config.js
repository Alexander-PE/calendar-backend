const mongoose = require('mongoose');

const dbConnection = async () => {
    try {

        await mongoose.connect(process.env.DB_CNN); //esto retorna una promesa
        console.log('DB conectada'); 

    } catch (error) {
        console.log(error);
        throw new Error("error al conectar con la base de datos");
    }
}


module.exports = {dbConnection};