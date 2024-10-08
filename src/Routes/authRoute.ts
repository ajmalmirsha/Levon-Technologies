import { Router } from "express";
import { Login, Register } from "../Controllers/auth";

const router = Router();

router.post("/login", Login);
router.post("/register", Register);

export default router;
