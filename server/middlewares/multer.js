import multer from "multer";

const storage = multer.memoryStorage();

const singleAvatar = multer({ storage }).single("avatar"); // chage avatar to file name
const multipleAttachemnts = multer({ storage }).array("files");

export { singleAvatar, multipleAttachemnts };
