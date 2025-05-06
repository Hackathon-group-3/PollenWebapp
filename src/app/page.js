"use client";
import Location_component from "./components/locationSearch/locationSearch";
import Map from "./components/Map/Map.js";
import PollenData from "./components/PollenSeverity/PollenData";
import PlantInfoComponent from "./components/plant_info_component/plant_info_component.js";
import HealthRecs from "./components/HealthRecs/HealthRecs";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [forecastData, setForecastData] = useState(null);
  const [geoData, setGeoData] = useState(null);
  const [error, setError] = useState(null);
  const [sensitiveGroups, setSensitiveGroups] = useState([]);
  const [safeActivities, setSafeActivities] = useState([]);
  const [UPIndex, setUpIndex] = useState(0);

  async function handleSearch(location_data) {
    try {
      setError(null);

      const geoResponse = await fetch(
        `/api/v1/geodata?location_data=${location_data}`,
      );

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

      const forecast = (await forecastResponse.json()).data;
      setForecastData(forecast);

      setSensitiveGroups(forecast.sensitiveGroups || []);
      setSafeActivities(forecast.safeActivities || []);

      const todays_forecast = forecast[0];
      let totalUPIndex = 0;
      let plantInfoCount = 0;
      let prototype_sensitive_groups = [];
      let prototype_safe_activities = [];

      if (todays_forecast?.pollenTypeInfo?.length > 0) {
        for (const pollenTypeInfo of todays_forecast.pollenTypeInfo) {
          if (pollenTypeInfo?.healthRecommendations != undefined) {
            for (const healthRecommendation of pollenTypeInfo.healthRecommendations) {
              prototype_safe_activities.push(healthRecommendation);
            }
          }
          for (const plantInfo of todays_forecast.plantInfo) {
            if (plantInfo?.indexInfo != undefined) {
              totalUPIndex += plantInfo.indexInfo.value;
              prototype_sensitive_groups.push(
                plantInfo.indexInfo.indexDescription,
              );
              plantInfoCount++;
            }
          }
        }
        prototype_sensitive_groups = [...new Set(prototype_sensitive_groups)];
        prototype_safe_activities = [...new Set(prototype_safe_activities)];

        const averageUPIndex = Math.round(totalUPIndex / plantInfoCount);

        setUpIndex(averageUPIndex);
        setSafeActivities(prototype_safe_activities);
        setSensitiveGroups(prototype_sensitive_groups);
      }
    } catch (error) {
      setError(error.message);
      setForecastData(null);
      setGeoData(null);
    }
  }

  return (
    <div className={styles.search}>
      <div className={styles.page}>
        <div className={styles.main}>
          <div className={styles.mapAndDataContainer}>
            <Location_component onSearch={handleSearch} />
            {forecastData && (
              <PollenData
                geoData={geoData}
                forecastData={forecastData}
                UPIndex={UPIndex}
              />
            )}
            {geoData && <Map geoData={geoData} />}
          </div>
          {forecastData && (
            <HealthRecs
              UPIndex={UPIndex}
              sensitiveGroups={sensitiveGroups}
              safeActivities={safeActivities}
            />
          )}
          {forecastData && <PlantInfoComponent forecastData={forecastData} />}
        </div>
      </div>
    </div>
  );
}
