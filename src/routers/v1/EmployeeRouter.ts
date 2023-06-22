import { verfToken, isAllPermis, isAdmAndEmp } from "../../middleware/Auth";
import employee from "../../controllers/EmployeeController";

import { Hono } from "hono";
const router = new Hono();

router.get(
  "/get-all/:branchId",

  employee.getAllEmployees
);
router.post("/get-one/", employee.getEmployeeByID);
router.post("/", employee.createEmployee);
router.put("/", employee.updateEmployee);
router.delete("/", employee.deleteEmployee);

export default router;
