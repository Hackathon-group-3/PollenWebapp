import { getForecast } from "@/app/lib/getForecast";
import PollenSeverity from "./PollenSeverity";

export default function PollenData({ geoData: forecast }) {
  //TODO use forecast object from web console and pass the correct properties here
  if (!forecast || forecast.length === 0) {
    return <p>No forecast available.</p>;
  }

  const today = forecast[0];
  const UPIndex = today?.index?.value || 0;
  const forecastText = today?.plants?.length
    ? `Main allergens: ${today.plants.map((p) => p.name).join(", ")}`
    : "No specific allergens detected today.";

  return (
    <PollenSeverity
      UPIndex={UPIndex}
      todaysForecast={forecastText}
      locationName={cityName}
    />
  );
}

