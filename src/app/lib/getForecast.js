import axios from "axios";

export const getForecast = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://pollen.googleapis.com/v1/forecast:lookup?key=${process.env.API_KEY}&location.longitude=${longitude}&location.latitude=${latitude}&days=1`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      },
    );

    return response.data.dailyInfo || [];
  } catch (error) {
    console.error("Error processing the request:", error);
  }
};
