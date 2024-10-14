import { WeatherData } from "../typings/WeatherData";
import { WeatherParams } from "../typings/WeatherParams";

const URL = import.meta.env.VITE_OPEN_WEATHER_MAP_URL;
const TOKEN = import.meta.env.VITE_OPEN_WEATHER_TOKEN;

export const fetchWeather = async ({
  lat,
  lon,
  units,
}: WeatherParams): Promise<WeatherData> => {
  const response = await fetch(
    `${URL}?lat=${lat}&lon=${lon}&units=${units}&appid=${TOKEN}`
  );
  return response.json();
};
