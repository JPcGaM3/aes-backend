import { DateTime } from "luxon";
import * as XLSX from "xlsx";

export const CheckRole = (role: string | null) => {
	if (
		role?.includes("Unit Agricultural Equipments") ||
		role?.includes("Billet Officer") ||
		role?.includes("เจ้าหน้าที่เครื่องมือ")
	) {
		return "DEPARTMENT_HEAD";
	}
	if (role?.includes("Unit Head") || role?.includes("หัวหน้าหน่วย")) {
		return "UNIT_HEAD";
	}
	if (role?.includes("Accountant") || role?.includes("บัญชี")) {
		return "ACCOUNTANT";
	}
	if (role?.includes("Maintenance") || role?.includes("ซ่อมบำรุง")) {
		return "MAINTENANCE";
	}
	return "DRIVER";
};

export const CheckUnit = (unit: string | null) => {
	if (unit?.search("/")) {
		let index = unit.indexOf("/");
		let unitNumber = parseInt(unit.substring(index - 1, index));
		if (isNaN(unitNumber)) return null;
		return unitNumber;
	}
	return null;
};

export const ConvertMonthTH_ENG = (month_th: string): string => {
	const months: { [key: string]: string } = {
		มกราคม: "January",
		กุมภาพันธ์: "February",
		มีนาคม: "March",
		เมษายน: "April",
		พฤษภาคม: "May",
		มิถุนายน: "June",
		กรกฎาคม: "July",
		สิงหาคม: "August",
		กันยายน: "September",
		ตุลาคม: "October",
		พฤศจิกายน: "November",
		ธันวาคม: "December",
	};
	return months[month_th] || month_th;
};

export const ConvertMonthENG_TH = (month_eng: string): string => {
	const months: { [key: string]: string } = {
		January: "มกราคม",
		February: "กุมภาพันธ์",
		March: "มีนาคม",
		April: "เมษายน",
		May: "พฤษภาคม",
		June: "มิถุนายน",
		July: "กรกฎาคม",
		August: "สิงหาคม",
		September: "กันยายน",
		October: "ตุลาคม",
		November: "พฤศจิกายน",
		December: "ธันวาคม",
	};
	return months[month_eng] || month_eng;
};

export const SplitWords = (text: string): string[] => {
	return text.split("+").filter(Boolean);
};

export const ReadExcelFile = (buffer: Buffer): Promise<any[]> => {
	return new Promise((resolve, reject) => {
		try {
			const workbook = XLSX.read(buffer, { type: "buffer" });

			const sheetName = workbook.SheetNames[0];
			if (!sheetName) {
				return reject(new Error("No sheets found in the Excel file."));
			}

			const worksheet = workbook.Sheets[sheetName];

			const jsonData = XLSX.utils.sheet_to_json(worksheet);

			resolve(jsonData);
		} catch (error: any) {
			console.error("Error reading Excel file in service:", error.message);
			reject(new Error(`Error reading Excel file: ${error.message}`));
		}
	});
};

export const ConvertMonthIndex_Eng = (monthIndex: number): string => {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	return months[monthIndex] || "";
};

export const ConvertToChristianDate = (buddhistDateString: string): Date => {
	const date = new Date(buddhistDateString);
	date.setFullYear(date.getFullYear() - 543);
	return date;
};

export const convertUTCtoTH = (utcInput: DateTime | string): DateTime => {
	const utcDateTime =
		typeof utcInput === "string"
			? DateTime.fromISO(utcInput, { zone: "utc" })
			: utcInput.setZone("utc");

	return utcDateTime.setZone("Asia/Bangkok");
};

export const convertTHtoUTC = (thInput: DateTime | string): DateTime => {
	let thDateTime: DateTime;

	if (typeof thInput === "string") {
		thDateTime = DateTime.fromISO(thInput, { zone: "Asia/Bangkok" });
	} else {
		thDateTime = thInput.setZone("Asia/Bangkok");
	}

	return thDateTime.toUTC();
};
