import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { fetchWeather } from "../../api/fetchWeather";
import { WeatherParams } from "../../typings/WeatherParams";
import styles from "./Map.module.css";
import { WeatherData } from "../../typings/WeatherData";

interface Props {
  weatherParams: WeatherParams;
  setWeatherParams: Dispatch<SetStateAction<WeatherParams>>;
}

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
const INITIAL_CENTER: [number, number] = [12.5655, 55.6759];
const INITIAL_ZOOM = 10.12;

const CLICKABLE_LAYERS = [
  "country-label",
  "state-label",
  "settlement-major-label",
  "settlement-subdivision-label",
  "poi-label",
  "road-street",
  "road-label",
  "water-point-label",
];

export const Map = ({ weatherParams, setWeatherParams }: Props) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useQuery<WeatherData, Error>({
    queryKey: ["weather-data", weatherParams],
    queryFn: async () => fetchWeather(weatherParams),
  });

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_TOKEN;

    if (!mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
      style: "mapbox://styles/mapbox/streets-v12",
    });

    mapRef.current.on("click", (event) => {
      const { lng: lon, lat } = event.lngLat;
      const features = mapRef.current?.queryRenderedFeatures(event.point, {
        layers: CLICKABLE_LAYERS,
      });

      if (features && features.length > 0) {
        setWeatherParams({ ...weatherParams, lon, lat });
      }
    });

    mapRef.current.on("mousemove", (event) => {
      const features = mapRef.current?.queryRenderedFeatures(event.point, {
        layers: CLICKABLE_LAYERS,
      });

      if (!mapRef.current) return;

      if (features && features.length > 0) {
        mapRef.current.getCanvas().style.cursor = "pointer";
      } else {
        mapRef.current.getCanvas().style.cursor = "";
      }
    });

    return () => {
      if (mapRef.current) {
        // TODO: Remove events
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      className={styles.mapContainer}
      id="map-container"
      ref={mapContainerRef}
    ></div>
  );
};
