const errorMessages = require("../constants/error-messages/index");

module.exports = class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnautorizedError() {
    return new ApiError(401, errorMessages.AUTH.UNAUTHORIZED);
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }

  static NotFound(message) {
    return new ApiError(404, message || errorMessages.COMMON.NOT_FOUND);
  }

  static Forbidden(message) {
    return new ApiError(403, message || errorMessages.AUTH.FORBIDDEN);
  }

  static InternalServerError(message = errorMessages.COMMON.INTERNAL_ERROR) {
    return new ApiError(500, message);
  }
};
