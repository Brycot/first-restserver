const validarCampos = require('./validar-campos');
const validarJWT = require('./validar-jwt');
const hasRole = require('./validar-roles');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...hasRole,
};
