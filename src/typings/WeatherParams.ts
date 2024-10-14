export enum Unit {
  Imperial = "imperial",
  Metric = "metric",
}

export interface WeatherParams {
  lon: number;
  lat: number;
  units: Unit;
}
