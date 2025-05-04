import { useState } from "react";
import Image from "next/image";
import styles from "./map.module.css";

export default function Map({ geoData }) {
  const [locationData] = useState(geoData);

  const { latitude, longitude, cityName } = locationData;
  const mapUrl = `/api/v1/staticmap?latitude=${latitude}&longitude=${longitude}`;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.text}>
          <h1>Location</h1>
          <p>
            Showing data for <span className={styles.city}>{cityName}</span>
          </p>
        </div>
        {latitude && longitude ? (
          <Image
            className={styles.map}
            src={mapUrl}
            alt={`Static map of ${cityName}`}
            width={400}
            height={400}
            loading="lazy"
          />
        ) : (
          <p>Cannot render map. Please check the location data.</p>
        )}
      </div>
    </div>
  );
}

