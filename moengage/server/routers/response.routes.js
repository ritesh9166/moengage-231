import { Router } from "express";
import { filterResponseCode } from "../controller/response.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/filter/:filter").get(filterResponseCode);

export default router;
