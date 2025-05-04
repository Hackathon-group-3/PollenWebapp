import axios from "axios";

export const getLatitudeLongitude = async (zipcode) => {
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
    if (!location) throw new Error("Location not found");

    return {
      latitude: location.lat,
      longitude: location.lng,
    };
  } catch (error) {
    console.error("Error processing the request:", error);
    return null;
  }
};
