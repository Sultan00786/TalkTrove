import multer from "multer";

const multerUpload = multer({
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

const singleAvatar = multerUpload.single("avatar");
const multipleAttachemnts = multerUpload.array("files");

export { singleAvatar, multipleAttachemnts };
