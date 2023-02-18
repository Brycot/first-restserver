const mongoose = require('mongoose');

const dbConecction = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(
            'mongodb+srv://brycot_node_cafe:StNDG7sTJkhQqGmk@miclustercafe.vjbzm22.mongodb.net/cafeDB'
        );
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
