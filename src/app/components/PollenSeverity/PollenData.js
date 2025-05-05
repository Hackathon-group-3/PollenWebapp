import PollenSeverity from "./PollenSeverity";

export default function PollenData({
  geoData: location,
  forecastData: forecast,
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
  let totalUPIndex = 0;
  let pollenTypeCount = 0;
  let firstPollenTypeIndexDescription = "";

  if (todays_forecast?.pollenTypeInfo?.length > 0) {
    for (const pollenType of todays_forecast.pollenTypeInfo) {
      forecastText += `${pollenType.displayName}, `;
      if (pollenType?.indexInfo?.value !== undefined) {
        totalUPIndex += pollenType.indexInfo.value;
        pollenTypeCount++;
        if (firstPollenTypeIndexDescription === "") {
          firstPollenTypeIndexDescription = pollenType.indexInfo.indexDescription;
        }
      }
    }

    const averageUPIndex = totalUPIndex / pollenTypeCount;

    forecastText = forecastText.slice(0, -2); // Remove the trailing comma and space

    return (
      <PollenSeverity
        UPIndex={averageUPIndex}
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

