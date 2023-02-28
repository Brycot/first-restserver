const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {
    const { limit = 5, offset = 0 } = req.query;
    const query = { state: true };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(Number(offset)).limit(Number(limit)),
    ]);

    res.json({
        total,
        usuarios,
    });
};

const usuariosGetById = async (req = request, res = response) => {
    const { id } = req.params;
    const usuario = await Usuario.findById(id);
    res.json({
        usuario,
    });
};

const usuariosPut = async (req = request, res = response) => {
    const { id } = req.params;

    const { _id, password, google, correo, ...userInfo } = req.body;

    // Validar contra base de datos
    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        userInfo.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, userInfo);

    res.status(200).json(usuario);
};

const usuariosPost = async (req = request, res = response) => {
    const { name, email, password, role } = req.body;
    const usuario = new Usuario({ name, email, password, role });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    // Guardar en bd
    await usuario.save();

    res.status(201).json({
        usuario,
    });
};

const usuariosDelete = async (req = request, res = response) => {
    const { id } = req.params;
    const userAutenticated = req.user;

    // Borramos
    const usuario = await Usuario.findByIdAndUpdate(id, { state: false });

    res.json({ usuario, userAutenticated });
};

const usuariosPatch = (req = request, res = response) => {
    res.json({
        msg: 'patch API - controlador',
    });
};

module.exports = {
    usuariosGet,
    usuariosGetById,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
};
