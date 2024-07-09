const errorMiddleware = (err, req, res, next) => {
  err.message ||= "Internal server error";
  err.statusCode ||= 500;

  console.log(err.statusCode);

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
    message: err.message,
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
