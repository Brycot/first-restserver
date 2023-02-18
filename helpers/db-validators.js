const Role = require('../models/role');
const Usuario = require('../models/usuario');

const IsValidRole = async (role = '') => {
    const existeRol = await Role.findOne({ role });
    if (!existeRol) {
        throw new Error(`El rol ${role} no esta registrado en la DB`);
    }
};

const emailExiste = async (email) => {
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
        throw new Error(`El correo ya esta registrado`);
    }
};

const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El usuario no existe`);
    }
};

module.exports = {
    IsValidRole,
    emailExiste,
    existeUsuarioPorId,
};
