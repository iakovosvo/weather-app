import { Dispatch, SetStateAction } from "react";
import { Unit, WeatherParams } from "../../typings/WeatherParams";
import styles from "./UnitSwitch.module.css";

interface Props {
  unit: Unit;
  setWeatherParams: Dispatch<SetStateAction<WeatherParams>>;
}

export const UnitSwitch = ({ unit, setWeatherParams }: Props) => {
  const changetUnit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeatherParams((prevParams) => ({
      ...prevParams,
      units: e.target.value as Unit,
    }));
  };

  return (
    <div>
      <label className={styles.labelContainer}>
        °C
        <input
          type="radio"
          checked={unit === Unit.Metric}
          name="celcius"
          value={Unit.Metric}
          onChange={changetUnit}
        />
        <span className={styles.checkmark}></span>
      </label>
      <label className={styles.labelContainer}>
        °F
        <input
          type="radio"
          name="fahrenheit"
          value={Unit.Imperial}
          onChange={changetUnit}
          checked={unit === Unit.Imperial}
        />
        <span className={styles.checkmark}></span>
      </label>
    </div>
  );
};
