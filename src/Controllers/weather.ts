import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../Utils/response";
import axios from "axios";
import redisClient from "..";

export const fetchWeatherData = async (req: Request, res: Response) => {
  try {
    const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

    const { city } = req.params;
    console.log("city", city);

    const url = `${WEATHER_API_URL}?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
    const response = await axios.get(url);
    redisClient.setEx(city.toLowerCase(), 600, JSON.stringify(response?.data));
    SuccessResponse(res, response?.data);
  } catch (error) {
    console.log(error);
    ErrorResponse(res, error?.message);
  }
};
