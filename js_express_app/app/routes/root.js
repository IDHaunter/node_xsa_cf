const express = require('express');
const config = require('../config');

const router = express.Router();

router.get('/', (req, res) => {
    const html = `
        <html>
            <head>
                <title>Welcome to the ${config.appName} service!</title>
            </head>
            <body>
                <h1>Welcome to the ${config.appName} service!</h1>
                <p>app name: <b>${config.appName}</b></p>
                <p>version: <b>${config.version}</b></p>
                <p>date: <b>${config.date}</b></p>
                <p>info: <b>${config.info}</b></p>
                <p>authorize: <b>${config.authorize}</b></p>
                <p>log level: <b>${config.logLevel}</b></p>
            </body>
        </html>
    `;

    res.send(html);
});

module.exports = router;