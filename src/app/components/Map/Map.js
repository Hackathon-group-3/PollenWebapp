import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./map.module.css";

export default function Map({ geoData }) {
  const [locationData, setLocationData] = useState(geoData);

  useEffect(() => {
    if (geoData) {
      setLocationData(geoData);
    }
  }, [geoData]);

  if (!locationData) return <p>Unable to load map data.</p>;

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
        <Image
          className={styles.map}
          src={mapUrl}
          alt={`Static map of ${cityName}`}
          width={400}
          height={400}
          loading="lazy"
        />
      </div>
    </div>
  );
}

