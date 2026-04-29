const express = require('express');
const http = require('http');
const routes = require('./routes');
const config = require('./config');
const logger = require('./logger');

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Connect routes
app.use(routes);

// Start server
server.listen(config.port, () => {
    logger.info(
        `${config.appName} v${config.version} listening on port ${config.port}`
    );
});