import PollenSeverity from "./PollenSeverity";

export default function PollenData({ forecast }) {
  //TODO use forecast object from web console and pass the correct properties here
  if (!geoData || geoData.length === 0) {
    return <p>No forecast available.</p>;
  }

  const today = geoData[0];
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

