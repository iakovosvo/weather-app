# weather-app
This is a simple weather application built with React. It integrates Mapbox for map functionalities and OpenWeather for weather data.

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
   ```

2. **Install the necessary dependencies:**
   ```bash
   npm install
   ```

3. **Create a Mapbox account:**
   - Go to [Mapbox](https://www.mapbox.com/).
   - Obtain your access token.
   - Create a `.env` file in the root of your project and add the following line:
   ```env
   VITE_MAPBOX_TOKEN=your_mapbox_token_here
   ```

4. **Create an OpenWeather account:**
   - Go to [OpenWeather](https://openweathermap.org/).
   - Obtain your API key.
   - Add the following lines to your `.env` file:
   ```env
   VITE_OPEN_WEATHER_TOKEN=your_open_weather_token_here
   VITE_OPEN_WEATHER_MAP_URL=https://api.openweathermap.org/data/2.5/weather
   ```

### Running the App

To start the development server, run:
```bash
npm run dev
```

## Features

- Interactive map powered by Mapbox.
- Current weather data fetched from OpenWeather.
- User-friendly interface for searching locations.
