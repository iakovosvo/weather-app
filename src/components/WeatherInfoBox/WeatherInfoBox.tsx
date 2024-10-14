import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { WeatherParams } from "../../typings/WeatherParams";
import { fetchWeather } from "../../api/fetchWeather";
import { WeatherData } from "../../typings/WeatherData";

interface Props {
  weatherParams: WeatherParams;
}

export const WeatherInfoBox = ({ weatherParams }: Props) => {
  const weatherData = useQuery<WeatherData, Error>({
    queryKey: ["weather-data", weatherParams],
    queryFn: async () => fetchWeather(weatherParams),
  });

  useEffect(() => {
    console.log(weatherData.data?.clouds.all);
  }, [weatherData]);
  return <div></div>;
};
