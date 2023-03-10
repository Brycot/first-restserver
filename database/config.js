const mongoose = require('mongoose');

const dbConecction = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('Base de datos online');
    } catch (error) {
        console.log(error);
        throw new Error(
            'Error a la hora de iniciar la base de datos no se pudo conectar'
        );
    }
};

module.exports = {
    dbConecction,
};
