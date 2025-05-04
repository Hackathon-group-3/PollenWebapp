import axios from "axios";

//TODO:
//1. Create a function that parses zipcode and translates it into latitude and longitude coordinates

export const getForecast = async (zipcode) => {
  const latitude = 32.32;
  const longitude = 35.32;

  let forecast = [];
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

    const data = response.data.dailyInfo;
    forecast = data;
  } catch (error) {
    console.error("Error processing the request:", error);
  }

  return forecast;
};
