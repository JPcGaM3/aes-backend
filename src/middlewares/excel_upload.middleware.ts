import multer from "multer";
import { Request } from "express";

const storage = multer.memoryStorage();

const excelFilter = (
	req: Request,
	file: Express.Multer.File,
	cb: multer.FileFilterCallback
) => {
	if (
		file.mimetype ===
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
		file.mimetype === "application/vnd.ms-excel" ||
		file.mimetype === "text/csv"
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

export const uploadExcels = multer({
	storage: storage,
	fileFilter: excelFilter,
	limits: {
		fileSize: 5 * 1024 * 1024,
	},
});
