import { Router } from "express";
import { getProfileData, getSettingsData } from "../Controllers/user";

const router = Router();

router.get("/settings", getSettingsData);
router.get("/profile", getProfileData);

export default router;
