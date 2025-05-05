import { NextResponse } from "next/server";
import axios from "axios";

export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const location_data = searchParams.get("location_data");

    if (!location_data) {
      return NextResponse.json(
        { message: "location_data parameter is required" },
        { status: 400 },
      );
    }

    const geoData = await getGeoLocation(location_data);

    if (!geoData) {
      return NextResponse.json(
        { message: "Failed to get geolocation data" },
        { status: 500 },
      );
    }

    return NextResponse.json({ data: geoData });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: error.status || 500 },
    );
  }
};

export const getGeoLocation = async (data) => {
  const secret = process.env.API_KEY;



  try {
    let link = ``
    if (isNumeric(data)){
      link = `https://maps.googleapis.com/maps/api/geocode/json?key=${secret}&components=postal_code:${data}`
    }
    else{
      link = `https://maps.googleapis.com/maps/api/geocode/json?key=${secret}&address=${data.replaceAll(" ", "%20")}`
    }
    const response = await axios.get( link,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      },
    );

    const location = response.data.results?.[0]?.geometry?.location;
    const cityInfo = response.data.results?.[0]?.formatted_address;
    const cityName = cityInfo
      ? cityInfo.split(",").slice(0, -1).join(",").trim()
      : "Unknown location";

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


function isNumeric(str) {
  if (typeof str != "string"){ 
    return false 
  }else{
    return !isNaN(str) && !isNaN(parseFloat(str)) 
  }
  
}
