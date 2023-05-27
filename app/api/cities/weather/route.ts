import { NextResponse } from "next/server";

function formatDate(date: string) {
  const dateElements = date.split("-");
  let newDate = `${dateElements[1]}/${dateElements[2]}`;
  if (newDate.charAt(0) === "0") newDate = newDate.substring(1);
  return newDate;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");

  const res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${latitude},${longitude}&days=3&aqi=no&alerts=no`,
    { next: { revalidate: 60 } }
  );

  const json = await res.json();

  console.log(json.forecast);

  const weather = {
    current: {
      temperature: Math.round(json.current.temp_f),
      temperatureFeelsLike: Math.round(json.current.feelslike_f),
      condition: json.current.condition.text,
      conditionIcon: json.current.condition.icon.replace("64x64", "128x128"),
      windSpeed: Math.round(json.current.wind_mph),
      windGustSpeed: Math.round(json.current.gust_mph),
      windDirection: json.current.wind_dir,
      pressure: json.current.pressure_in,
      humidity: json.current.humidity,
    },
    forecast: {
      dayOne: {
        date: formatDate(json.forecast.forecastday[0].date),
        temperatureHigh: Math.round(json.forecast.forecastday[0].day.maxtemp_f),
        temperatureLow: Math.round(json.forecast.forecastday[0].day.mintemp_f),
        condition: json.forecast.forecastday[0].day.condition.text,
        conditionIcon: json.forecast.forecastday[0].day.condition.icon.replace(
          "64x64",
          "128x128"
        ),
        chanceOfRain: json.forecast.forecastday[0].day.daily_chance_of_rain,
      },
      dayTwo: {
        date: formatDate(json.forecast.forecastday[1].date),
        temperatureHigh: Math.round(json.forecast.forecastday[1].day.maxtemp_f),
        temperatureLow: Math.round(json.forecast.forecastday[1].day.mintemp_f),
        condition: json.forecast.forecastday[1].day.condition.text,
        conditionIcon: json.forecast.forecastday[1].day.condition.icon.replace(
          "64x64",
          "128x128"
        ),
        chanceOfRain: json.forecast.forecastday[1].day.daily_chance_of_rain,
      },
      dayThree: {
        date: formatDate(json.forecast.forecastday[2].date),
        temperatureHigh: Math.round(json.forecast.forecastday[2].day.maxtemp_f),
        temperatureLow: Math.round(json.forecast.forecastday[2].day.mintemp_f),
        condition: json.forecast.forecastday[2].day.condition.text,
        conditionIcon: json.forecast.forecastday[2].day.condition.icon.replace(
          "64x64",
          "128x128"
        ),
        chanceOfRain: json.forecast.forecastday[2].day.daily_chance_of_rain,
      },
    },
  };

  return NextResponse.json(weather);
}
