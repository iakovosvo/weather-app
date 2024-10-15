import { useQuery } from "@tanstack/react-query";
import { Unit, WeatherParams } from "../../typings/WeatherParams";
import { fetchWeather } from "../../api/fetchWeather";
import { WeatherData } from "../../typings/WeatherData";
import styles from "./WeatherInfoBox.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Props {
  weatherParams: WeatherParams;
}

export const WeatherInfoBox = ({ weatherParams }: Props) => {
  const weatherData = useQuery<WeatherData, Error>({
    queryKey: ["weather-data", weatherParams],
    queryFn: async () => fetchWeather(weatherParams),
  });

  const unit = weatherParams.units === Unit.Imperial ? "°F" : "°C";

  if (weatherData.isLoading) {
    return (
      <div className={styles.infoBoxContainer}>
        <Skeleton count={5} />
      </div>
    );
  }

  if (weatherData.isError) {
    return <div className={styles.infoBoxContainer}>Something went wrong</div>;
  }

  if (!weatherData.data) {
    return <div className={styles.infoBoxContainer}>No weather info found</div>;
  }

  return (
    <div className={styles.infoBoxContainer}>
      <div className={styles.locationInfo}>
        <h1 className={styles.name}>
          {weatherData.data.name}, {weatherData.data.sys?.country}
        </h1>
      </div>
      <span className={styles.temperature}>
        {weatherData.data.main?.temp} {unit}
      </span>
      <p className={styles.infoText}>
        {weatherData.data.weather[0]?.description}
      </p>
      <p className={styles.infoText}>
        Real feel: {weatherData.data.main?.feels_like} {unit}
      </p>
    </div>
  );
};
