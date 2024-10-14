import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";

const INITIAL_CENTER: [number, number] = [12.5655, 55.6759];
const INITIAL_ZOOM = 10.12;
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

function App() {
  const [center, setCenter] = useState<[number, number]>(INITIAL_CENTER);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_TOKEN;

    if (!mapContainerRef.current) {
      return;
    }

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center,
      zoom,
      style: "mapbox://styles/mapbox/streets-v12",
    });

    mapRef.current.on("click", (event) => {
      const { lng, lat } = event.lngLat;
      console.log("Coordinates:", lng, lat);
    });

    mapRef.current.on("load", () => {
      console.log("Available layers:", mapRef.current?.getStyle()?.layers);
    });

    mapRef.current.on("mousemove", (event) => {
      const features = mapRef.current?.queryRenderedFeatures(event.point, {
        layers: [
          "country-label",
          "state-label",
          "settlement-major-label",
          "settlement-subdivision-label",
          "poi-label",
          "road-street",
          "road-label",
          "water-point-label",
        ],
      });

      if (!mapRef.current) {
        return;
      }

      if (features && features.length > 0) {
        mapRef.current.getCanvas().style.cursor = "pointer"; // Show pointer cursor
      } else {
        mapRef.current.getCanvas().style.cursor = ""; // Reset cursor when not over a feature
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
    <>
      <div>Search</div>
      <div>info box</div>
      <div id="map-container" ref={mapContainerRef}></div>
    </>
  );
}

export default App;
