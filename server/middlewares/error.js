const errorMiddleware = (err, req, res, next) => {
  err.message ||= "Internal server error";
  err.statusCode ||= 500;

  if (err.code === 11000) {
    const error = Object.keys(err.keyPattern).join(", ");
    err.message = `Error occur because of dublicate - ${error}`;
    err.statusCode = 400;
  }

  if (err.name === "CastError") {
    const errPath = err.path;
    err.message = `Invalid ${errPath}`;
    err.statusCode = 400;
  }

  return res.status(err.statusCode).json({
    success: false,
    // for development mode only ke liye "DEVELOPMENT" === process.env.NODE_ENV.trim() rahega then pura error show karna hie nahi to only err.message
    message: "DEVELOPMENT" === process.env.NODE_ENV.trim() ? err : err.message,
    errorCode: err.code,
  });
};

const TryCatch = (controllerFunc) => async (req, res, next) => {
  try {
    await controllerFunc(req, res, next);
  } catch (error) {
    next(error);
  }
};

export { errorMiddleware, TryCatch };
