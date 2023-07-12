import { FC, useEffect, useState } from "react";
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
  Img,
} from "./style";
import { Graphic } from "../../Graphic";
import { useAppDispatch } from "../../../store/hooks";
import { deleteCity } from "../../../store/city";
import { IContent } from "./interface";
import { deleteCurrentCityLocation } from "../../../store/currentCity";
import { useTranslation } from "react-i18next";

export const Content: FC<IContent> = ({ city, temp, feelsLike, index }) => {
  const dispatch = useAppDispatch();
  const [switcherTemp, setSwitcherTemp] = useState<any>(
    (temp - 273.15).toFixed(0)
  );
  const [switcherFeelsLike, setFeelsLike] = useState<any>(
    (((temp - 273.15) * 9) / 5 + 32).toFixed(0)
  );
  const [activeTemp, setActiveTemp] = useState<boolean>(true);
  const { t } = useTranslation();

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
    setActiveTemp(true);
  };

  const switcherFahrenheit = () => {
    setSwitcherTemp((((temp - 273.15) * 9) / 5 + 32).toFixed(0));
    setActiveTemp(false);
  };

  const closeWeatherCard = (index: number) => {
    if (index === 120) {
      dispatch(deleteCurrentCityLocation());
    }
    dispatch(deleteCity(index));
  };

  useEffect(() => {
    const storedActiveTemp = localStorage.getItem(`activeTemp-${city.id}`);
    if (storedActiveTemp) {
      setActiveTemp(storedActiveTemp === "true");
    } else {
      setActiveTemp(true);
    }
  }, [city]);

  useEffect(() => {
    if (temp && feelsLike) {
      const celsiusTemp = (temp - 273.15).toFixed(0);
      const fahrenheitTemp = (((temp - 273.15) * 9) / 5 + 32).toFixed(0);
      setSwitcherTemp(activeTemp ? celsiusTemp : fahrenheitTemp);
      setFeelsLike(
        activeTemp
          ? (feelsLike - 273.15).toFixed(0)
          : (((feelsLike - 273.15) * 9) / 5 + 32).toFixed(0)
      );
    }
  }, [temp, feelsLike, activeTemp]);

  useEffect(() => {
    localStorage.setItem(`activeTemp-${city.id}`, activeTemp.toString());
  }, [city, activeTemp]);

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
          <Graphic index={index} city={city} activeTemp={activeTemp} />
          <div>
            <BlockFooter>
              <div>
                <WTemp>
                  <Temp>{`${
                    switcherTemp > 0 ? "+" : "-"
                  }${switcherTemp}`}</Temp>
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
                </WTemp>
                <Feels>
                  {t("feels")}:{" "}
                  <TempFeelLike>
                    {activeTemp
                      ? `${(feelsLike - 273.15).toFixed(0)} °C`
                      : `${(((feelsLike - 273.15) * 9) / 5 + 32).toFixed(
                          0
                        )} °F`}
                  </TempFeelLike>
                </Feels>
              </div>
              <WWind>
                <Text>
                  {t("wind")}:{" "}
                  <Yellow
                    style={{
                      color: index % 2 !== 0 ? "#FFA25B" : "#459DE9",
                    }}
                  >
                    {city.wind.speed} m/s
                  </Yellow>
                </Text>
                <Text>
                  {t("humidity")} :{" "}
                  <Yellow
                    style={{
                      color: index % 2 !== 0 ? "#FFA25B" : "#459DE9",
                    }}
                  >
                    {city.main.humidity} %
                  </Yellow>
                </Text>
                <Text>
                  {t("pressure")}:{" "}
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
