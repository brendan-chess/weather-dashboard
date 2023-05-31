import CityList from "./CityList";
import CitySearchBar from "./CitySearchBar";
import CityWeather from "./CityWeather";

export default function Page() {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:gap-x-8 md:max-w-screen-md md:min-w-[768px] p-4 md:h-[560px] min-w-[335px]">
      <div className="md:basis-1/3">
        <CitySearchBar />
        <CityList />
      </div>
      <div className="md:basis-2/3">
        <CityWeather />
      </div>
    </div>
  );
}
