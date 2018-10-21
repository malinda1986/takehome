const _ = require('lodash');
const chalk = require('chalk');

const log = require('../servies/logger/Logger');
const NotFoundError = require('./not-found-error');
const BadRequestError = require('./bad-request-error');
const InternalServerError = require('./internal-server-error');
const NoPermissionError = require('./no-permission-error');
const MethodNotAllowedError = require('./method-not-allowed-error');
const UnauthorizedError = require('./unauthorized-error');
const ValidationError = require('./validation-error');

function isValidErrorStatus(status) {
    return _.isNumber(status) && status >= 400 && status < 600;
}

function getStatusCode(error) {
    if (error.statusCode) {
        return error.statusCode;
    }

    if (error.status && isValidErrorStatus(error.status)) {
        error.statusCode = error.status;
        return error.statusCode;
    }

    if (error.code && isValidErrorStatus(error.code)) {
        error.statusCode = error.code;
        return error.statusCode;
    }

    error.statusCode = 500;
    return error.statusCode;
}

const errors = {
    /**
     * Converts the error response from the API into a format which can be returned over HTTP
     */
    formatHttpErrors(error) {
        let statusCode = 500;
        const httpErrors = [];

        if (!_.isArray(error)) {
            error = [].concat(error);
        }

        _.each(error, function each(errorItem) {
            const errorContent = {};
            statusCode = getStatusCode(errorItem);

            if (_.isString(errorItem)) {
                errorContent.message = errorItem;
            } else if (_.isObject(errorItem)) {
                errorContent.message = errorItem.message;
            } else {
                errorContent.message = 'Unknown API error';
            }
            errorContent.errorType = errorItem.errorType || 'InternalServerError';
            httpErrors.push(errorContent);
        });

        return {
            errors: httpErrors,
            statusCode: statusCode
        };
    },
    handleAPIError(err, req, res, next) { // eslint-disable-line no-unused-vars
        const httpErrors = this.formatHttpErrors(err);
        this.logError(err);
        // Send a properly formatted HTTP response containing the errors
        res.status(httpErrors.statusCode).json({
            errors: httpErrors.errors
        });
    },
    logError(err, context, help) {
        const self = this,
            origArgs = _.toArray(arguments).slice(1);

        if (_.isArray(err)) {
            _.each(err, function(e) {
                const newArgs = [e].concat(origArgs);
                errors.logError.apply(self, newArgs);
            });
            return;
        }

        const stack = err ? err.stack : null;

        if (!_.isString(err)) {
            if (_.isObject(err) && _.isString(err.message)) {
                err = err.message;
            } else if (_.isObject(err) && _.isObject(err.message)) {
                err = JSON.stringify(err.message);
            } else {
                err = 'Unknown API error';
            }
        }

        const msgs = [chalk.red(err), '\n'];
        if (context) {
            msgs.push(chalk.white(context), '\n');
        }
        if (help) {
            msgs.push(chalk.green(help));
        }
        // add a new line
        msgs.push('\n');

        if (stack) {
            msgs.push(stack, '\n');
        }
        // log error
        log.error(msgs.join(''));
    }
};

// make sure `this` binded correctly
_.each([
    'handleAPIError',
    'formatHttpErrors',
    'logError'
], function(funcName) {
    errors[funcName] = errors[funcName].bind(errors);
});

module.exports = errors;
module.exports.NotFoundError = NotFoundError;
module.exports.BadRequestError = BadRequestError;
module.exports.InternalServerError = InternalServerError;
module.exports.NoPermissionError = NoPermissionError;
module.exports.UnauthorizedError = UnauthorizedError;
module.exports.ValidationError = ValidationError;
module.exports.MethodNotAllowedError = MethodNotAllowedError;
