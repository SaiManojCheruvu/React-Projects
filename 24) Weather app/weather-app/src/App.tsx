import React from "react";

// Define types for weather and geolocation data
type GeoData = {
  results: {
    latitude: number;
    longitude: number;
    timezone: string;
    name: string;
    country_code: string;
  }[];
};

type WeatherData = {
  daily: {
    time: string[];
    weathercode: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
};

type AppState = {
  location: string;
  isLoading: boolean;
  displayLocation: string;
  weather: Partial<WeatherData["daily"]>;
};

type WeatherProps = {
  weather: Partial<WeatherData["daily"]>;
  location: string;
};

type DayProps = {
  date: string;
  max: number;
  min: number;
  code: number;
  isToday: boolean;
};

type InputProps = {
  location: string;
  onChangeLocation: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function getWeatherIcon(wmoCode: number): string {
  const icons = new Map<number[], string>([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr: number[] | undefined = Array.from(icons.keys()).find((key) =>
    key.includes(wmoCode)
  );
  if (!arr) return "NOT FOUND";
  return icons.get(arr)!;
}

function convertToFlag(countryCode: string): string {
  const codePoints: number[] = countryCode
    .toUpperCase()
    .split("")
    .map((char: string) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function formatDay(dateStr: string): string {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      location: "Lisbon",
      isLoading: false,
      displayLocation: "",
      weather: {},
    };

    this.fetchWeather = this.fetchWeather.bind(this);
  }

  fetchWeather = async (): Promise<void> => {
    if (this.state.location.length < 2) return this.setState({ weather: {} });
    try {
      this.setState({ isLoading: true });
      // 1) Getting location (geocoding)
      const geoRes: Response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
      );
      const geoData: GeoData = await geoRes.json();
      console.log(geoData);

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results[0];
      this.setState({
        displayLocation: `${name} ${convertToFlag(country_code)}`,
      });

      // 2) Getting actual weather
      const weatherRes: Response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData: WeatherData = await weatherRes.json();
      this.setState({ weather: weatherData.daily });
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ location: e.target.value });
  };
  componentDidMount(): void {
    // this.fetchWeather(); // Starts to fetch weather as soon as page is loaded
    // Works like useEffect() with empty dependency array, i.e only on mounts and not on re-renders
    this.setState({ location: localStorage.getItem("location") || "" });
  }
  // Works similar to useEffect[location]
  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<AppState>,
    snapshot?: any
  ): void {
    if (this.state.location !== prevState.location) {
      this.fetchWeather();
    }
    localStorage.setItem("location", this.state.location);
  }

  render(): React.ReactNode {
    return (
      <div className="app">
        <h1>Classy Weather</h1>
        <div>
          <Input
            location={this.state.location}
            onChangeLocation={this.handleLocationChange}
          />
        </div>
        <button onClick={this.fetchWeather}>Get Weather</button>
        {this.state.isLoading && <p className="loader">Loading...</p>}
        {this.state.weather.weathercode && (
          <Weather
            weather={this.state.weather}
            location={this.state.displayLocation}
          />
        )}
      </div>
    );
  }
}

class Input extends React.Component<InputProps> {
  componentWillUnmount(): void {
    console.log("Weather component will unmount");
  }
  render() {
    return (
      <input
        type="text"
        placeholder="Search for location..."
        value={this.props.location}
        onChange={this.props.onChangeLocation}
      />
    );
  }
}

class Weather extends React.Component<WeatherProps> {
  render() {
    const {
      temperature_2m_max: max,
      temperature_2m_min: min,
      time,
      weathercode: codes,
    } = this.props.weather;

    return (
      <div>
        <h2>Weather in {this.props.location}</h2>
        <ul className="weather">
          {time &&
            time.map((date, i) => (
              <Day
                date={date}
                max={max?.[i] ?? 0}
                min={min?.[i] ?? 0}
                code={codes?.[i] ?? 0}
                key={date}
                isToday={i === 0}
              />
            ))}
        </ul>
      </div>
    );
  }
}

class Day extends React.Component<DayProps> {
  render() {
    const { date, max, min, code, isToday } = this.props;
    return (
      <li className="day">
        <span>{getWeatherIcon(code)}</span>
        <p>{isToday ? "Today" : formatDay(date)}</p>
        <p>
          {Math.floor(min)}&deg; &mdash; <strong>{Math.ceil(max)}&deg;</strong>
        </p>
      </li>
    );
  }
}

export default App;
