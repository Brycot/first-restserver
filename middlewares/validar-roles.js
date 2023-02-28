const { response } = require('express');

const isAdminRole = (req, res = response, next) => {
    if (!req.user) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero',
        });
    }

    const { role, name } = req.user;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} is not administrator`,
        });
    }
    next();
};

const hasRole =
    (...roles) =>
    (req, res = response, next) => {
        if (!req.user) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero',
            });
        }

        const { role, name } = req.user;

        if (!roles.includes(role)) {
            return res.status(401).json({
                msg: `${name} has not autoritation, required some of these roles ${roles}`,
            });
        }
        next();
    };

module.exports = {
    isAdminRole,
    hasRole,
};
