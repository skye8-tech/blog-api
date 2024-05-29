const multer = require("multer");
// const path = require('node:path')
// const fs = require('node:fs')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `src/uploads/`);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now().toString().replace(/ /g, "-")}_${file.originalname.replace(
        / /g,
        "-"
      )}`.replace(/-/g, "_")
    );
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    console.log(file);
    if (!file.mimetype.startsWith("image")) {
      cb("File type not accepted. Must be an image");
    }
    cb(null, true);
  },
});

module.exports = upload;
