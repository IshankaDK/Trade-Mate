import { Router } from "express";

import dotenv from "dotenv";
import AuthController from "../controller/authController";

dotenv.config();

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

export default router;
