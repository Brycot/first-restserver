const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = (req = request, res = response) => {
    const { q, nombre, apikey } = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
    });
};

const usuariosPut = (req = request, res = response) => {
    const { id } = req.params;

    res.status(200).json({
        msg: 'put API - controlador',
        id,
    });
};

const usuariosPost = async (req = request, res = response) => {
    const { name, email, password, role } = req.body;
    const usuario = new Usuario({ name, email, password, role });

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
        return res.status(400).json({
            msg: 'El correo ya esta registrado',
        });
    }
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    // Guardar en bd
    await usuario.save();
    res.status(201).json({
        msg: 'post API - controlador',
        usuario,
    });
};

const usuariosDelete = (req = request, res = response) => {
    res.json({
        msg: 'delete API - controlador',
    });
};

const usuariosPatch = (req = request, res = response) => {
    res.json({
        msg: 'patch API - controlador',
    });
};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
};
