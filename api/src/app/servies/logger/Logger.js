const winston = require('winston');
const path = require('path');
const config = require('../../config');
const logLevel = config.get('log_level');

winston.emitErrs = true;

const logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: logLevel,
            filename: path.join(__dirname, '../../../../logs/log.log'),
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        })
    ],
    exitOnError: false
});

// do not log to console to prevent cluttering app's log messages
// with test runner messages
if (process.env.NODE_ENV !== 'test') {
    logger.add(winston.transports.Console, {
        level: 'info',
        handleExceptions: false,
        json: false,
        colorize: true
    });
}

logger.emitErrs = true;

const logglyConf = config.get('loggly');
if (logglyConf && logglyConf.subdomain && logglyConf.token) {
    const options = {
        level: logLevel,
        subdomain: logglyConf.subdomain,
        inputToken: logglyConf.token,
        tags: ['profile-service']
    };
    // will expose winston.transports.Loggly
    require('winston-loggly');
    logger.add(winston.transports.Loggly, options);
}

module.exports = logger;
module.exports.stream = {
    write: function(message) {
        logger.info(message);
    }
};
