"use client";
import Location_component from "./components/locationSearch/locationSearch";
import styles from "./page.module.css";
import Map from "./components/Map/Map.js";
import PollenData from "./components/PollenSeverity/PollenData";
import { useState } from "react";
import PlantInfoComponent from "./components/plant_info_component/plant_info_component.js";
import HealthRecs from "./components/HealthRecs/HealthRecs";

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

      console.log(todays_forecast);


    
      if (todays_forecast?.plantInfo?.length > 0) {
        for (const pollenTypeInfo of todays_forecast.pollenTypeInfo) {
          
          if (pollenTypeInfo?.healthRecommendations != undefined){
            
            
            for (const healthRecommendation of pollenTypeInfo.healthRecommendations) {
              prototype_safe_activities.push(healthRecommendation);
            }
            
          }
          
        }
        // console.log(todays_forecast.pollenTypeInfo);
        for (const plantInfo of todays_forecast.plantInfo) {
          if (plantInfo?.indexInfo != undefined) {
            totalUPIndex += plantInfo.indexInfo.value;
            prototype_sensitive_groups.push(plantInfo.indexInfo.indexDescription);
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
          {(forecastData && geoData) && <PollenData geoData={geoData} forecastData={forecastData}  UPIndex={UPIndex} className={styles.row_element} />}
        </div>

        
        <div className={styles.row_holder}>
        {geoData && <Map geoData={geoData} className={styles.row_element} />}


        {forecastData && <PlantInfoComponent forecastData={forecastData} className={styles.row_element} />}
        </div>
        <div className={styles.row_holder}> 
        {forecastData && (
            <HealthRecs
              UPIndex={UPIndex}
              sensitiveGroups={sensitiveGroups}
              safeActivities={safeActivities}
              className={styles.row_element}
            />
          )}

        </div>

      </main>
      <footer className={styles.footer}>
      </footer>

    </div>
  );
}
