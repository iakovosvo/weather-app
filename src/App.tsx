import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Map } from "./components/Map/Map";
import { WeatherInfoBox } from "./components/WeatherInfoBox/WeatherInfoBox";
import { Unit, WeatherParams } from "./typings/WeatherParams";
import { useState } from "react";
import "./App.css";

function App() {
  const queryClient = new QueryClient();
  const [weatherParams, setWeatherParams] = useState<WeatherParams>({
    lon: 12.5655,
    lat: 55.6759,
    units: Unit.Metric,
  });

  // TODO: Make switch component for changing the unit

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div>Search</div>
        <div>Switch</div>
        <WeatherInfoBox weatherParams={weatherParams} />
        <Map
          weatherParams={weatherParams}
          setWeatherParams={setWeatherParams}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
