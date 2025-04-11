const ApiError = require("../exceptions/api-error");

module.exports = function (err, req, res, next) {
  console.error("Error:", err);

  if (err instanceof ApiError) {
    return res.status(err.status).json({
      message: err.message,
      errors: err.errors,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  }

  return res.status(500).json({
    message: "Unexpected error occurred",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
