import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import mapboxgl, { MapMouseEvent } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { SearchBox } from "@mapbox/search-js-react";
import { SearchBoxRetrieveResponse } from "@mapbox/search-js-core";
import { WeatherParams } from "../../typings/WeatherParams";
import styles from "./MapBox.module.css";

interface Props {
  setWeatherParams: Dispatch<SetStateAction<WeatherParams>>;
}

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
const MAPBOX_STYLE = "mapbox://styles/mapbox/streets-v12";
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

export const Map = ({ setWeatherParams }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const handleMapClick = useCallback(
    (event: mapboxgl.MapMouseEvent) => {
      const { lng: lon, lat } = event.lngLat;
      const features = mapRef.current?.queryRenderedFeatures(event.point, {
        layers: CLICKABLE_LAYERS,
      });

      if (features && features.length > 0) {
        setWeatherParams((prevParams) => ({ ...prevParams, lat, lon }));
      }
    },
    [setWeatherParams]
  );

  const handleMouseMove = (event: MapMouseEvent) => {
    if (!mapRef.current) {
      return;
    }

    const features = mapRef.current.queryRenderedFeatures(event.point, {
      layers: CLICKABLE_LAYERS,
    });

    mapRef.current.getCanvas().style.cursor = features.length ? "pointer" : "";
  };

  const getSearchCoordinates = (retrievOptions: SearchBoxRetrieveResponse) => {
    if (retrievOptions.features?.length) {
      const coordinates = retrievOptions.features[0]?.properties?.coordinates;

      if (coordinates) {
        const { longitude: lon, latitude: lat } = coordinates;
        setWeatherParams((prevParams) => ({ ...prevParams, lon, lat }));
      }
    }
  };

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_TOKEN;

    if (!mapContainerRef.current) {
      return;
    }

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
      style: MAPBOX_STYLE,
    });

    mapRef.current.on("click", handleMapClick);
    mapRef.current.on("mousemove", handleMouseMove);

    return () => {
      if (mapRef.current) {
        mapRef.current.off("click", handleMapClick);
        mapRef.current.off("mousemove", handleMouseMove);
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [handleMapClick]);

  return (
    <div className={styles.mapContainer}>
      {mapRef.current ? (
        <SearchBox
          accessToken={MAPBOX_TOKEN}
          map={mapRef.current}
          mapboxgl={mapboxgl}
          value={inputValue}
          onChange={(value) => {
            setInputValue(value);
          }}
          onRetrieve={getSearchCoordinates}
          marker
        />
      ) : null}
      <div
        className={styles.map}
        id="map-container"
        ref={mapContainerRef}
      ></div>
    </div>
  );
};
