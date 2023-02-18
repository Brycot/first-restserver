const { Router } = require('express');
const { check } = require('express-validator');
const Role = require('../models/role');

const { validarCampos } = require('../middlewares/validar-campos');

const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
} = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post(
    '/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El Password debe de ser más de 6 personas').isLength(
            { min: 6 }
        ),
        check('email', 'El correo no es valido').isEmail(),
        // check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('role').custom(async (role = '') => {
            const existeRol = await Role.findOne({ role });
            if (!existeRol) {
                throw new Error(`El rol ${role} no esta registrado en la DB`);
            }
        }),
        validarCampos,
    ],
    usuariosPost
);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;
