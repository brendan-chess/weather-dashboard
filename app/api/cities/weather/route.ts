import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");

  const res = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${latitude},${longitude}&aqi=no`,
    { next: { revalidate: 0 } }
  );

  const json = await res.json();

  const weather = {
    temperature: Math.round(json.current.temp_f),
    temperatureFeelsLike: Math.round(json.current.feelslike_f),
    condition: json.current.condition.text,
    windSpeed: Math.round(json.current.wind_mph),
    windGustSpeed: Math.round(json.current.gust_mph),
    windDirection: json.current.wind_dir,
    pressure: json.current.pressure_in,
    humidity: json.current.humidity,
  };

  return NextResponse.json(weather);
}
