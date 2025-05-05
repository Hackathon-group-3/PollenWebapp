import { NextResponse } from "next/server";
import axios from "axios";

export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get("latitude");
    const lng = searchParams.get("longitude");

    if (!lat || !lng) {
      return NextResponse.json(
        { message: "Latitude and longitude parameters are required" },
        { status: 400 },
      );
    }

    const forecastData = await getForecast(lat, lng);

    if (!forecastData) {
      return NextResponse.json(
        { message: "Failed to fetch forecast data" },
        { status: 500 },
      );
    }

    return NextResponse.json({ data: forecastData });
  } catch (error) {
    console.error("Error in forecast API route:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
};

const getForecast = async (latitude, longitude) => {
  try {
    const secret = process.env.API_KEY;
    const response = await axios.get(
      `https://pollen.googleapis.com/v1/forecast:lookup?key=${secret}&location.longitude=${longitude}&location.latitude=${latitude}&days=1`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      },
    );

    return response.data.dailyInfo || [];
  } catch (error) {
    console.error("Error processing the forecast request:", error);
    return null;
  }
};
