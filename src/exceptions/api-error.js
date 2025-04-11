module.exports = class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) { 
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnautorizedError() {
    return new ApiError(401, "User isn't autorized!");
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }

  static NotFound(message) {
    return new ApiError(404, message || "Resource not found!");
  }

  static Forbidden(message) {
    return new ApiError(403, message || "You do not have permission!");
  }

  static InternalServerError(message = "Something went wrong!") {
    return new ApiError(500, message);
  }
}