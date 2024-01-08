import multer from "multer";

export default class FileUploader {
  constructor() {
    const storageConfig = multer.diskStorage({
      destination: (req, file, callback) => {
        callback(null, "./uploads");
      },
      filename: (req, file, callback) => {
        callback(null, `${Date.now()}-${file.originalname}`);
      },
    });

    this.upload = multer({ storage: storageConfig }).single("file");
  }

  getUploader() {
    return this.upload;
  }
}