import multer from "multer";
import { Request } from "express";

// Configure Multer storage: using memory storage so we get a buffer
const storage = multer.memoryStorage();

// File filter to accept only Excel files
const excelFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || // .xlsx
    file.mimetype === "application/vnd.ms-excel" || // .xls
    file.mimetype === "text/csv" // .csv (often supported by excel readers)
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Initialize Multer with the storage and file filter
export const upload = multer({
  storage: storage,
  fileFilter: excelFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5MB per file
  },
});
