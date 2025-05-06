import PollenSeverity from "./PollenSeverity";

export default function PollenData({
  geoData: location,
  forecastData: forecast,
  UPIndex : index,
}) {
  if (
    !location ||
    location.length === 0 ||
    !forecast ||
    forecast.length === 0
  ) {
    return <p>No forecast available.</p>;
  }

  const todays_forecast = forecast[0];
  const cityName = location?.cityName || "Unknown";
  let forecastText = "";
  let firstPollenTypeIndexDescription = "";

  if (todays_forecast?.pollenTypeInfo?.length > 0) {
    for (const pollenType of todays_forecast.pollenTypeInfo) {
      forecastText += `${pollenType.displayName}, `;
      if (pollenType?.indexInfo?.value !== undefined) {
        if (firstPollenTypeIndexDescription === "") {
          firstPollenTypeIndexDescription = pollenType.indexInfo.indexDescription;
        }
      }
    }

    

    forecastText = forecastText.slice(0, -2); // Remove the trailing comma and space

    return (
      <PollenSeverity
        UPIndex={index}
        todaysForecast={forecastText}
        indexDescription={firstPollenTypeIndexDescription}
        locationName={cityName}
      />
    );
  } else {
    forecastText = "No specific allergens detected today.";
    return (
      <PollenSeverity
        UPIndex={0}
        todaysForecast={forecastText}
        locationName={cityName}
      />
    );
  }
}

