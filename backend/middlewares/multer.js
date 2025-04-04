import multer from "multer";

const storage = multer.memoryStorage();

const uploader = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024, fields: 5 },
});

export default uploader;
