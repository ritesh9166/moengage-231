import { Router } from "express";
import { login, logout, register } from "../controller/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);

router.use(verifyJWT);

// secured routes
router.route("/logout").post(logout);

export default router;
