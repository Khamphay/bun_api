import { Hono } from "hono";
import register from "./RegisRouter";
import login from "./LoginRouter";
import user from "./UserInforRouter";
import unit from "./UnitRouter";
import possition from "./PossitionRouter";
import province from "./ProvinceRouter";
import district from "./DistrictRouter";
import village from "./VillageRouter";
import role from "./RoleRouter";
import zone from "./ZoneRouter";
import merchant from "./MerchantRouter";
import branch from "./BrancheRouter";
import stt from "./StatusRouter";
import stock from "./StockRouter";
import employee from "./EmployeeRouter";

const router = new Hono();

router.route("/register", register);
router.route("/login", login);
router.route("/users", user);
router.route("/units", unit);
router.route("/possitions", possition);
router.route("/provinces", province);
router.route("/districts", district);
router.route("/villages", village);
router.route("/roles", role);
router.route("/zones", zone);
router.route("/merchants", merchant);
router.route("/branches", branch);
router.route("/status", stt);
router.route("/stocks", stock);
router.route("/employees", employee);

export default router;
