import CityList from "./CityList";
import CitySearchBar from "./CitySearchBar";
import CityWeather from "./CityWeather";

export default function Page() {
  return (
    <>
      <CitySearchBar />
      <CityList />
      <CityWeather />
    </>
  );
}
