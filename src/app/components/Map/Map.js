import { getGeoLocation } from "@/app/lib/getGeoLocation";
import styles from "./map.module.css";

export default async function Map() {
  //FIX: temporary zipcode
  // 1. Gather zip from props after user search is implemented
  // 2. Test other zip codes (optional)
  const geoData = await getGeoLocation(95126);

  if (!geoData) return <p>Unable to load map data.</p>;

  const { latitude, longitude, cityName } = geoData;
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
        <div>
          <img
            className={styles.map}
            src={mapUrl}
            alt="Static Map"
            width={400}
            height={400}
          />
        </div>
      </div>
    </div>
  );
}
