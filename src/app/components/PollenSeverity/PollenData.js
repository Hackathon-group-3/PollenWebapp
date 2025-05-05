import PollenSeverity from "./PollenSeverity";

export default function PollenData({ geoData: location,  forecastData: forecast }) {
  //TODO use forecast object from web console and pass the correct properties here
  if (!location|| location.length === 0 || !forecast || forecast.length === 0) {
    return <p>No forecast available.</p>;
  }

  const todays_forecast = forecast[0];
  const cityName = location?.cityName || "Unknown";
  let forecastText = `Main allergens: `
  let UPIndex = 0
  if (todays_forecast?.plantInfo?.length > 0){
    for (const plant in todays_forecast.plantInfo) {
      const plantInfo = todays_forecast.plantInfo[plant];
      forecastText += `${plantInfo.displayName}, `
      if (plantInfo?.indexInfo){
        UPIndex += plantInfo.indexInfo.value
      }
    }
    
    UPIndex /= todays_forecast.plantInfo.length
    UPIndex = Math.round(UPIndex * 10) / 10
  } else{
    forecastText = "No specific allergens detected today.";
    UPIndex = 0
  }
  return (
    <PollenSeverity
      UPIndex={UPIndex}
      todaysForecast={forecastText}
      locationName={cityName}
    />
  );
}

