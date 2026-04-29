const xssec = require('@sap/xssec');
const services = require('../config').services;

module.exports = function authMiddleware(req, res, next) {
    if (!services || !services.uaa) {
        return res.status(500).send('UAA service not configured');
    }

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send('Missing Authorization header');
    }

    const token = authHeader.split(' ')[1];

    xssec.createSecurityContext(token, services.uaa, (err, securityContext) => {
        if (err) {
            return res.status(403).send('Invalid token');
        }

        req.securityContext = securityContext;
        next();
    });
};