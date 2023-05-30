export default function Footer() {
  return (
    <div className="text-center mt-8">
      <p className="text-sm font-semibold">
        Created by{" "}
        <a
          href="https://brendanchess.com/"
          target="_blank"
          title="Brendan Chess"
          className="hover:text-indigo-500"
        >
          Brendan Chess
        </a>
      </p>
      <p className="text-slate-400 text-xs font-light mt-1">
        Powered by{" "}
        <a
          href="https://www.weatherapi.com/"
          target="_blank"
          title="Free Weather API"
          className="hover:text-slate-200"
        >
          WeatherAPI.com
        </a>
        {" and "}
        <a
          href="https://simplemaps.com/data/us-cities"
          target="_blank"
          title="Free Weather API"
          className="hover:text-slate-200"
        >
          simplemaps
        </a>
        . View source on{" "}
        <a
          href="https://github.com/brendan-chess/weather-dashboard"
          target="_blank"
          title="weather-dashboard on GitHub"
          className="hover:text-slate-200"
        >
          GitHub
        </a>
      </p>
    </div>
  );
}
