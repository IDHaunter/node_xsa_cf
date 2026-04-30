const express = require('express');
const http = require('http');
const routes = require('./routes');
const config = require('./config');
const logger = require('./logger');
const authMiddleware = require('./middleware/auth');

logger.info(`Starting ${config.appName} v${config.version}...`);

const app = express();
const server = http.createServer(app);

// Apply auth globally (handles public paths internally)
app.use(authMiddleware);

// Connect routes middleware
app.use(routes);

// Start server
server.listen(config.port, () => {
    logger.info(
        `${config.appName} v${config.version} listening on port ${config.port}`
    );
});