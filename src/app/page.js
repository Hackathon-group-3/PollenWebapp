"use client";
import Location_component from "./components/locationSearch/locationSearch";
import styles from "./page.module.css";
import Map from "./components/Map/Map.js";
import PollenData from "./components/PollenSeverity/PollenData";
import { useState } from "react";

export default function Home() {
  const [forecastData, setForecastData] = useState(null);
  const [geoData, setGeoData] = useState(null);
  const [error, setError] = useState(null);

  async function handleSearch(zipcode) {
    try {
      setError(null);

      const geoResponse = await fetch(`/api/v1/geodata?zipcode=${zipcode}`);

      if (!geoResponse.ok) {
        const err = await geoResponse.json();
        throw new Error(err.message || "Failed to fetch geolocation");
      }

      const { data } = await geoResponse.json();
      setGeoData(data);

      const forecastResponse = await fetch(
        `/api/v1/forecast?latitude=${data.latitude}&longitude=${data.longitude}`,
      );

      if (!forecastResponse.ok) {
        const err = await forecastResponse.json();
        throw new Error(err.message || "Failed to fetch forecast");
      }

      const forecast = await forecastResponse.data;

      setForecastData(forecastData);
      console.log("Forecast Data:", forecastData);
    } catch (error) {
      setError(error.message);
      setForecastData(null);
      setGeoData(null);
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.row_holder}>
          <Location_component
            onSearch={handleSearch}
            className={styles.row_element}
          />
        </div>
        <div className={styles.row_holder}>
          <PollenData className={styles.row_element} />
        </div>

        {geoData && <Map geoData={geoData} className={styles.row_element} />}
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
