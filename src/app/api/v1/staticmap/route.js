import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const latitude = searchParams.get("latitude");
    const longitude = searchParams.get("longitude");

    if (!latitude || !longitude) {
      return NextResponse.json(
        { error: "Missing latitude or longitude" },
        { status: 400 },
      );
    }

    const secret = process.env.API_KEY;
    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=400x400&key=${secret}`;

    const response = await axios.get(mapUrl, {
      responseType: "arraybuffer",
    });

    return new NextResponse(response.data, {
      headers: {
        "Content-Type": "image/png",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch static map" },
      { status: 500 },
    );
  }
}
