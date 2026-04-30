const xssec = require('@sap/xssec');
const config = require('../config');

module.exports = function authMiddleware(req, res, next) {

    // Always set defaults
    req.securityContext = null;
    req.currentUser = 'anonymous';

    // 1. Feature flag OFF → skip everything
    if (!config.authorize) {
        return next();
    }

    // 2. Public endpoints → skip auth
    const isPublic = config.publicPaths.some(path =>
        req.path === path || req.path.startsWith(path + '/')
    );

    if (isPublic) {
        return next();
    }

    // 3. Auth enabled but no UAA → configuration error
    if (!config.services || !config.services.uaa) {
        return res.status(500).send('Authorization enabled but no UAA service bound');
    }

    // 4. Read Authorization header
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader) {
        return res.status(401).send('Missing Authorization header');
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).send('Invalid Authorization header format');
    }

    const token = parts[1];

    // 5. Validate token
    xssec.createSecurityContext(token, config.services.uaa, (err, securityContext) => {
        if (err) {
            return res.status(403).send('Invalid token');
        }

        req.securityContext = securityContext;

        // Extract user safely
        req.currentUser =
            securityContext.getLogonName?.() ||
            securityContext.getEmail?.() ||
            securityContext.getUserName?.() ||
            'unknown';

        next();
    });
};