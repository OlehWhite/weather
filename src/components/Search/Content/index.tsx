import { FC, useState } from "react";
import {
  Container,
  Card,
  City,
  Day,
  Weather,
  Close,
  WrapperCard,
  Block,
  WCity,
  WWeather,
  Temp,
  CelsiusAndFahrenheit,
  WTemp,
  Line,
  Feels,
  TempFeelLike,
  Text,
  WWind,
  Yellow,
} from "./style";
import IMGSun from "../../../assest/icons/sun.png";
import { Graphic } from "../../Graphic";

const moc_data = {
  coord: {
    lon: 30.52,
    lat: 50.45,
  },
  weather: [
    {
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01d",
    },
  ],
  base: "stations",
  main: {
    temp: 293.15,
    feels_like: 292.43,
    pressure: 1014,
    humidity: 45,
  },
  visibility: 10000,
  wind: {
    speed: 3,
    deg: 70,
  },
  clouds: {
    all: 0,
  },
  dt: 1655462665,
  sys: {
    type: 1,
    id: 8926,
    country: "UA",
    sunrise: 1655450631,
    sunset: 1655506549,
  },
  timezone: 10800,
  id: 703448,
  name: "Kyiv",
  cod: 200,
};

export const Content: FC = () => {
  const [switcherTemp, setSwitcherTemp] = useState<any>(
    moc_data.main.temp - 273.15
  );
  const [switcherFeelsLike, setFeelsLike] = useState<any>(
    (moc_data.main.feels_like - 273.15).toFixed(0)
  );
  const [activeTemp, setActiveTemp] = useState<boolean>(true);

  const dt = new Date(moc_data.dt * 1000);
  const options: any = {
    weekday: "short" as const,
    day: "numeric",
    month: "long" as const,
    hour: "2-digit",
    minute: "2-digit",
  };
  const formattedDate = dt.toLocaleString("en-US", options);

  const switcherCelsius = () => {
    setSwitcherTemp(moc_data.main.temp - 273.15);
    if (!activeTemp) {
      setActiveTemp(!activeTemp);
    }
  };

  const switcherFahrenheit = () => {
    setSwitcherTemp(((moc_data.main.temp - 273.15) * 9) / 5 + 32);
    if (activeTemp) {
      setActiveTemp(!activeTemp);
    }
  };

  const closeWeatherCard = () => {
    console.log("close");
  };

  return (
    <Container>
      <Card>
        <WrapperCard>
          <Block>
            <WCity>
              <City>
                {moc_data.name}, {moc_data.sys.country}
              </City>
            </WCity>
            <WWeather>
              <img src={IMGSun} alt="Sun" title="Sun" />
              <Weather>{moc_data.weather[0].main}</Weather>
            </WWeather>
          </Block>
          <Day>{formattedDate}</Day>
          <Graphic />
          <div>
            <Block>
              <WTemp>
                <div>
                  <Temp>{`${
                    +switcherTemp > 0 ? "+" : "-"
                  } ${switcherTemp}`}</Temp>
                  <Feels>
                    Feels like:{" "}
                    <TempFeelLike>
                      {activeTemp
                        ? `${switcherFeelsLike} °C`
                        : `${((switcherFeelsLike * 9) / 5 + 32).toFixed(0)} °F`}
                    </TempFeelLike>
                  </Feels>
                </div>
                <div>
                  <CelsiusAndFahrenheit
                    style={{ color: activeTemp ? "#000" : "#C5C5C5" }}
                    onClick={switcherCelsius}
                  >
                    °C
                  </CelsiusAndFahrenheit>
                  <Line>|</Line>
                  <CelsiusAndFahrenheit
                    style={{ color: !activeTemp ? "#000" : "#C5C5C5" }}
                    onClick={switcherFahrenheit}
                  >
                    °F
                  </CelsiusAndFahrenheit>
                </div>
              </WTemp>
              <WWind>
                <Text>
                  Wind: <Yellow>{moc_data.wind.speed} m/s</Yellow>
                </Text>
                <Text>
                  Humidity: <Yellow>{moc_data.main.humidity} %</Yellow>
                </Text>
                <Text>
                  Pressure: <Yellow>{moc_data.main.pressure} Pa</Yellow>
                </Text>
              </WWind>
            </Block>
          </div>
        </WrapperCard>
        <Close onClick={closeWeatherCard}>x</Close>
      </Card>
    </Container>
  );
};
