const { Router, response } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { login } = require('../controllers/auth');

const router = Router();

router.post(
    '/login',
    [
        check('email', 'El correo no es valido').isEmail(),
        check('password', 'El Password debe de ser más de 6 personas').isLength(
            { min: 6 }
        ),
        validarCampos,
    ],
    login
);

module.exports = router;
