const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generarJWT');

const login = async (req = request, res = response) => {
    const { email, password } = req.body;

    try {
        // verificar si el email existe
        const user = await Usuario.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'The email is not registered',
            });
        }
        // verificar si el usuario esta activo
        if (!user.state) {
            return res.status(400).json({
                msg: 'The user has been deleted',
            });
        }
        //varificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'The password is invalid',
            });
        }
        // Generar el JWT
        const token = await generarJWT(user.id);

        return res.json({
            user,
            token,
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Contact with administrator',
        });
    }
};

module.exports = {
    login,
};



