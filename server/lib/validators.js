import { body, check, param, query, validationResult } from "express-validator";
import { ErrorHnadle } from "../utils/utility.js";

const validatorHandler = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
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

const newGroupValidator = () => [
  body("name", "Please Enter Group Name").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Enter Memeber")
    .isArray({ min: 2, max: 100 })
    .withMessage("Please Select Atleast two Memeber"),
];

const addMembersValidator = () => [
  body("chatId", "Please Enter Chat Id").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Enter Memeber")
    .isArray({ min: 1, max: 97 })
    .withMessage("Please Select Atleast one Memeber"),
];

const removeMembersValidator = () => [
  body("chatId", "Please Enter Chat Id").notEmpty(),
  body("userId", "Please Enter User Id").notEmpty(),
];

const leaveGroupValidator = () => [
  param("id", "Please Enter Chat Id").notEmpty(),
];

const sendAttachmentsValidator = () => [
  body("chatId", "Please Enter Chat Id").notEmpty(),
];

const getMessagesValidator = () => [
  param("id", "Please Enter Chat Id").notEmpty(),
];

const searchUserValidator = () => [
  query("name", "Please Enter Name").notEmpty(),
];

const sendFriendRequestValidator = () => [
  body("userId", "Please Enter User Id").notEmpty(),
];

const acceptRequestValidator = () => [
  body("requestId", "Please Enter User Id").notEmpty(),
  body("accept")
    .notEmpty()
    .withMessage("Please Enter accept")
    .isBoolean()
    .withMessage("accept must be boolean !!"),
];

const adminLoginValidator = () => [
  body(
    "sceretKey",
    "Please Enter the Scerert Key for login as Admin"
  ).notEmpty(),
];

export {
  addMembersValidator,
  getMessagesValidator,
  leaveGroupValidator,
  loginValidator,
  newGroupValidator,
  registerValidator,
  removeMembersValidator,
  sendAttachmentsValidator,
  validatorHandler,
  searchUserValidator,
  sendFriendRequestValidator,
  acceptRequestValidator,
  adminLoginValidator,
};
