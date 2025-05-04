import axios from "axios";

export const getGeoLocation = async (zipcode) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.API_KEY}&components=postal_code:${zipcode}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      },
    );

    const location = response.data.results?.[0]?.geometry?.location;
    const cityInfo = response.data.results?.[0]?.formatted_address;
    const cityName = cityInfo.split(",").slice(0, -1).join(",").trim();

    if (!location) throw new Error("Location not found");

    return {
      latitude: location.lat,
      longitude: location.lng,
      cityName,
    };
  } catch (error) {
    console.error("Error processing the request:", error);
    return null;
  }
};
