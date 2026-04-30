const xsenv = require("@sap/xsenv");
const auth = require("./middleware/auth");
const logger = require('./logger'); 

let services = {};

// Load variables from environment
const AUTHORIZE = process.env.AUTHORIZE === 'TRUE';

// Services **********
try {
    services = Object.assign(services, xsenv.getServices({ uaa: { tag: "xsuaa" } }));
} catch (err) {
    console.log("[WARN]", err.message);
}

// Export configuration
module.exports = {
    appName: 'js_express_app',
    version: '26.18.1',
    date: '2026.04.29',
    info : 'Not a real app, just a pattern for XSA CF',
    port: process.env.PORT || 5000,
    authorize: AUTHORIZE,
    services: services,
    logLevel:  logger.LOG_LEVELS[logger.levelIndex].toUpperCase(),

    // Public endpoints (allowlist)
    publicPaths: [
        '/',
        '/health',
        '/favicon.ico'
    ]
};