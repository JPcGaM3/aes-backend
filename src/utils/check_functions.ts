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
