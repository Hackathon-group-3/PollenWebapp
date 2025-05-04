import { getGeoLocation } from "@/app/lib/getGeoLocation";
import styles from "./map.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Map({ geoData }) {
  const [locationData, setLocationData] = useState(geoData);

  useEffect(() => {
    if (!geoData) {
      getGeoLocation().then((data) => {
        setLocationData(data);
      });
    }
  }, [geoData]);

  if (!locationData) return <p>Unable to load map data.</p>;

  const { latitude, longitude, cityName } = locationData;
  const apiKey = process.env.API_KEY;
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=400x400&key=${apiKey}`;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.text}>
          <h1>Location</h1>
          <p>
            Showing data for
            <span className={styles.city}> {cityName}</span>
          </p>
        </div>
          <Image
            className={styles.map}
            src={mapUrl}
            alt="Static Map"
            width={400}
            height={400}
            priority
          />
        </div>
      </div>
  );
}
