import { getForecast } from "@/app/lib/getForecast";
// import { getGeoLocation } from "@/app/lib/getGeoLocation";
import PollenSeverity from "./PollenSeverity";

// Connect to 1. User location Input Location Component

export default async function PollenData () {
    // Passing in temp. zip code from Map function
    // const geoData = await getGeoLocation(95126);
    const geoData = null;

    if (!geoData) {
        return <p> Unable to load map data. Please try again.</p>
    }
        console.log('User geo data here', geoData)

    const { latitude, longitude, cityName } = geoData;

    const forecastData = await getForecast(latitude, longitude);

    if (!forecastData || forecastData.length === 0) {
        return <p>No forecast available.</p>;
    }

    const today = forecastData[0]; 
    const UPIndex = today?.index?.value || 0; 
    const forecastText = today?.plants?.length
      ? `Main allergens: ${today.plants.map(p => p.name).join(", ")}`
      : "No specific allergens detected today."

    return (
    <PollenSeverity
        UPIndex={UPIndex}       
        todaysForecast={forecastText}
        locationName={cityName}
    />
    )
}