const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'The token is required',
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // Leer ekl usuario que corresponde al uid
        const user = await Usuario.findById(uid);
        if (!user) {
            return res.status(401).json({
                msg: 'The token is required - user does not exist',
            });
        }
        // Verificar que el usuario este activado
        if (!user.state) {
            return res.status(401).json({
                msg: 'Token is not valid - user has been deleted',
            });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            msh: 'Token is not valid',
        });
    }
};

module.exports = {
    validarJWT,
};
