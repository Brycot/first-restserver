const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT, hasRole } = require('../middlewares');

const {
    IsValidRole,
    emailExiste,
    existeUsuarioPorId,
} = require('../helpers/db-validators');
const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
    usuariosGetById,
} = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);
router.get(
    '/:id',
    [
        check('id', 'No es un ID  Válido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos,
    ],
    usuariosGetById
);

router.put(
    '/:id',
    [
        check('id', 'No es un ID  Válido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('role').custom(IsValidRole),
        validarCampos,
    ],
    usuariosPut
);

router.post(
    '/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check(
            'password',
            'El Password debe de ser más de 6 caracteres'
        ).isLength({ min: 6 }),
        check('email', 'El correo no es valido').isEmail(),
        check('email').custom(emailExiste),
        check('role').custom(IsValidRole),
        validarCampos,
    ],
    usuariosPost
);

router.delete(
    '/:id',
    [
        validarJWT,
        // isAdminRole,
        hasRole('ADMIN_ROLE'),
        check('id', 'No es un ID  Válido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos,
    ],
    usuariosDelete
);

router.patch('/', usuariosPatch);

module.exports = router;
