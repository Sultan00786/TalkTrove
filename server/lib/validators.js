import { body, check, validationResult } from "express-validator";
import { ErrorHnadle } from "../utils/utility.js";

const registerValidator = () => [
  body("name", "Please Enter Name").notEmpty(),
  body("username", "Please Enter Username").notEmpty(),
  body("password", "Please Enter Password").notEmpty(),
  body("bio", "Please Enter Bio").notEmpty(),
  check("avatar", "Please Enter Avatar").notEmpty(),
];

const loginValidator = () => [
  body("username", "Please Enter Username").notEmpty(),
  body("password", "Please Enter Password").notEmpty(),
];

const validatorHandler = (req, res, next) => {
  const errors = validationResult(req);
  const errorsMsg = errors
    .array()
    .map((err) => err.msg)
    .join(", ");
  if (errors.isEmpty()) {
    next();
  } else {
    return next(new ErrorHnadle(errorsMsg, 400));
  }
};

export { registerValidator, loginValidator, validatorHandler };
