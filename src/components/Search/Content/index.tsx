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
  BlockFooter,
  BoxTemp,
  Img,
} from "./style";
import { Graphic } from "../../Graphic";
import { useAppDispatch } from "../../../store/hooks";
import { deleteCity } from "../../../store/city";

export const Content: FC<any> = ({ city, temp, feelsLike, index }) => {
  const dispatch = useAppDispatch();
  const [switcherTemp, setSwitcherTemp] = useState<any>(
    (temp - 273.15).toFixed(0)
  );
  const [switcherFeelsLike, setFeelsLike] = useState<any>(
    (feelsLike - 273.15).toFixed(0)
  );
  const [activeTemp, setActiveTemp] = useState<boolean>(true);

  const dt = new Date(city.dt * 1000);
  const options: any = {
    weekday: "short" as const,
    day: "numeric",
    month: "long" as const,
    hour: "2-digit",
    minute: "2-digit",
  };
  const formattedDate = dt.toLocaleString("en-US", options);

  const switcherCelsius = () => {
    setSwitcherTemp((temp - 273.15).toFixed(0));
    if (!activeTemp) {
      setActiveTemp(!activeTemp);
    }
  };

  const switcherFahrenheit = () => {
    setSwitcherTemp((((temp - 273.15) * 9) / 5 + 32).toFixed(0));
    if (activeTemp) {
      setActiveTemp(!activeTemp);
    }
  };

  const closeWeatherCard = (index: number) => {
    dispatch(deleteCity(index));
  };

  return (
    <Container>
      <Card
        style={{ backgroundColor: index % 2 !== 0 ? "#FFFAF1" : "#F1F2FF" }}
      >
        <WrapperCard>
          <Block>
            <City>
              {city.name}, {city.sys.country}
            </City>
            <WWeather>
              <Img
                src={`http://openweathermap.org/img/w/${city.weather[0].icon}.png`}
                alt="Weather-img"
                title="Weather-img"
              />
              <Weather>{city.weather[0].main}</Weather>
            </WWeather>
          </Block>
          <Day>{formattedDate}</Day>
          <Graphic index={index} city={city} />
          <div>
            <BlockFooter>
              <WTemp>
                <div>
                  <Temp>
                    {`${+switcherTemp > 0 ? "+" : "-"} ${switcherTemp}`}
                  </Temp>
                  <Feels>
                    Feels like:{" "}
                    <TempFeelLike>
                      {activeTemp
                        ? `${switcherFeelsLike} °C`
                        : `${((switcherFeelsLike * 9) / 5 + 32).toFixed(0)} °F`}
                    </TempFeelLike>
                  </Feels>
                </div>
                <BoxTemp>
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
                </BoxTemp>
              </WTemp>
              <WWind>
                <Text>
                  Wind:{" "}
                  <Yellow
                    style={{
                      color: index % 2 !== 0 ? "#FFA25B" : "#459DE9",
                    }}
                  >
                    {city.wind.speed} m/s
                  </Yellow>
                </Text>
                <Text>
                  Humidity:{" "}
                  <Yellow
                    style={{
                      color: index % 2 !== 0 ? "#FFA25B" : "#459DE9",
                    }}
                  >
                    {city.main.humidity} %
                  </Yellow>
                </Text>
                <Text>
                  Pressure:{" "}
                  <Yellow
                    style={{
                      color: index % 2 !== 0 ? "#FFA25B" : "#459DE9",
                    }}
                  >
                    {city.main.pressure} Pa
                  </Yellow>
                </Text>
              </WWind>
            </BlockFooter>
          </div>
        </WrapperCard>
        <Close onClick={() => closeWeatherCard(index)}>x</Close>
      </Card>
    </Container>
  );
};
