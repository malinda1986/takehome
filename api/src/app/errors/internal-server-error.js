function InternalServerError(message) {
    this.message = message;
    this.stack = new Error().stack;
    this.statusCode = 500;
    this.errorType = this.name;
}

InternalServerError.prototype = Object.create(Error.prototype);
InternalServerError.prototype.name = 'InternalServerError';

module.exports = InternalServerError;
