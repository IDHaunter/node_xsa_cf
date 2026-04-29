/**********************************************************************
* HOW TO USE :
* const logger = require('./logger');    
* logger.debug('Debug message'); 
* logger.info('Informational message');
* logger.warn('Warning message');
* logger.error('Error message');
* logger.info('User data:', {id: 123, name: 'John'});
*
**********************************************************************/

class Logger {
  constructor() {
    // Supported log levels
    this.LOG_LEVELS = ['error', 'warn', 'info', 'debug'];

    // Get log level from environment or default to 'debug'
    const envLevel = process.env.LOG_LEVEL || 'debug';

    // Normalize 'warning' to 'warn'
    if (envLevel === 'warning') {
      envLevel = 'warn';
    }

    this.levelIndex = this.LOG_LEVELS.indexOf(envLevel.toLowerCase());

    if (this.levelIndex === -1) {
      console.warn(`[LOGGER] Unknown LOG_LEVEL: "${envLevel}", defaulting to "warn"`);
      this.levelIndex = this.LOG_LEVELS.indexOf('warn');
    }
  }

  log(level, ...args) {
    const currentLevelIndex = this.LOG_LEVELS.indexOf(level);
    if (currentLevelIndex <= this.levelIndex) {
		const tag = `[${level.toUpperCase()}]`;
		const output = [tag, ...args.map(arg => 
		typeof arg === 'object' ? JSON.stringify(arg) : arg
		)].join(' ');
		
		switch (level) {
		case 'error':
		  console.error(output);
		  break;
		case 'warn':
		  console.warn(output);
		  break;
		default:
		  console.log(output);
		  break;
		}
    }
  }

  error(...args) {
    this.log('error', ...args);
  }

  warn(...args) {
    this.log('warn', ...args);
  }

  info(...args) {
    this.log('info', ...args);
  }

  debug(...args) {
    this.log('debug', ...args);
  }
}

// Export the singleton object
module.exports = new Logger();