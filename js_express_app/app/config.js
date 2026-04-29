const xsenv = require("@sap/xsenv");

let services = {};

// Services **********
try {
    services = Object.assign(services, xsenv.getServices({ hana: { tag: "xsuaa" } }));
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
    services: services
};