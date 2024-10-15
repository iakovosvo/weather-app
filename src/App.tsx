import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WeatherPanelPage } from "./components/WeatherPanelPage/WeatherPanelPage";
import "./App.css";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <WeatherPanelPage />
      </QueryClientProvider>
    </>
  );
}

export default App;
