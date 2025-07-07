import multer from "multer";
import { Request } from "express";
import path from "path";
import fs from "fs";

const getWeekOfMonth = (date: Date): number => {
	const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
	const dayOfMonth = date.getDate();

	const firstDayOfWeek = firstDayOfMonth.getDay();

	return Math.ceil((dayOfMonth + firstDayOfWeek) / 7);
};

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, "0");
const weekOfMonth = getWeekOfMonth(currentDate);

const monthDir = `${year}-${month}`;
const weekDir = `week-${weekOfMonth}`;
const uploadDir = path.join(
	__dirname,
	`../../uploads/images/evidence/${monthDir}/${weekDir}`
);

if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, "0");
		const weekOfMonth = getWeekOfMonth(now);

		const monthDir = `${year}-${month}`;
		const weekDir = `week-${weekOfMonth}`;
		const currentUploadDir = path.join(
			__dirname,
			`../../uploads/images/evidence/${monthDir}/${weekDir}`
		);

		if (!fs.existsSync(currentUploadDir)) {
			fs.mkdirSync(currentUploadDir, { recursive: true });
		}

		cb(null, currentUploadDir);
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		const fileExtension = path.extname(file.originalname);
		cb(null, uniqueSuffix + fileExtension);
	},
});

const imageFilter = (
	req: Request,
	file: Express.Multer.File,
	cb: multer.FileFilterCallback
) => {
	if (
		file.mimetype === "image/jpeg" ||
		file.mimetype === "image/png" ||
		file.mimetype === "image/jpg"
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

export const uploadImages = multer({
	storage: storage,
	fileFilter: imageFilter,
	limits: {
		fileSize: 20 * 1024 * 1024,
	},
});
