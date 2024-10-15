import { useQuery } from "@tanstack/react-query";
import { Map } from "../MapBox/MapBox";
import { WeatherInfoBox } from "../WeatherInfoBox/WeatherInfoBox";
import { WeatherData } from "../../typings/WeatherData";
import { useState } from "react";
import { Unit, WeatherParams } from "../../typings/WeatherParams";
import { fetchWeather } from "../../api/fetchWeather";
import { UnitSwitch } from "../UnitSwitch/UnitSwitch";
import styles from "./WeatherPanelPage.module.css";

export const WeatherPanelPage = () => {
  const [weatherParams, setWeatherParams] = useState<WeatherParams>({
    lon: 12.5655,
    lat: 55.6759,
    units: Unit.Metric,
  });

  useQuery<WeatherData, Error>({
    queryKey: ["weather-data", weatherParams],
    queryFn: async () => fetchWeather(weatherParams),
  });

  return (
    <>
      <div className={styles.topContainer}>
        <WeatherInfoBox weatherParams={weatherParams} />
        <UnitSwitch
          setWeatherParams={setWeatherParams}
          unit={weatherParams.units}
        />
      </div>
      <Map setWeatherParams={setWeatherParams} />
    </>
  );
};
