import { Router } from "express";
import { fetchWeatherData } from "../Controllers/weather";
import { checkCache } from "../Middlewares/Redis";

const router = Router();

router.get("/:city", checkCache, fetchWeatherData);

export default router;
