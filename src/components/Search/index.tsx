import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  Container,
  Form,
  Input,
  Button,
  Wrapper,
  WrapperInput,
  List,
  Item,
  Close,
  Text,
} from "./style";
import { FC, useState, ChangeEvent, FormEvent, useEffect } from "react";
import { selectCities } from "../../store/city";
import { Content } from "./Content";
import { cities } from "../../store/city/thunks";
import { currentCity } from "../../store/currentCity/thunks";
import { selectCurrentCity } from "../../store/currentCity";
import { useTranslation } from "react-i18next";

export const Search: FC = () => {
  const dispatch = useAppDispatch();
  const { cities: currentCities } = useAppSelector(selectCities);
  const { currentCity: cityLocation } = useAppSelector(selectCurrentCity);
  const [inputValue, setInputValue] = useState("");
  const [searchTows, setSearchTows] = useState<string[]>([]);
  const [isInputActive, setIsInputActive] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(currentCity({ latitude, longitude }));
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const savedSearchTows = localStorage.getItem("searchTows");
    if (savedSearchTows) {
      setSearchTows(JSON.parse(savedSearchTows));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("searchTows", JSON.stringify(searchTows));
  }, [searchTows]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setIsInputActive(true);
  };

  const handleAddButtonClick = (event: FormEvent) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      setSearchTows((prevState) => [inputValue, ...prevState]);
      dispatch(cities(inputValue));
      setInputValue("");
    }
  };

  const deleteSearchTown = (
    index: number,
    event: React.MouseEvent<HTMLSpanElement>
  ) => {
    event.stopPropagation();
    setSearchTows((prevState) => {
      const updatedSearchTows = [...prevState];
      updatedSearchTows.splice(index, 1);
      return updatedSearchTows;
    });
  };

  return (
    <>
      <Container>
        <Form onSubmit={handleAddButtonClick}>
          <WrapperInput>
            <Input
              type="text"
              value={inputValue}
              onChange={handleChange}
              onFocus={() => setIsInputActive(true)}
              onBlur={() => setIsInputActive(false)}
            />
            {isInputActive && (
              <List>
                {searchTows &&
                  searchTows.map((town, index) => (
                    <Item key={index}>
                      <Text onMouseDown={() => dispatch(cities(town))}>
                        {town}
                      </Text>
                      <Close
                        onMouseDown={(event) => deleteSearchTown(index, event)}
                      >
                        x
                      </Close>
                    </Item>
                  ))}
              </List>
            )}
          </WrapperInput>
          <Button type="submit">{t("add")}</Button>
        </Form>
      </Container>
      <Wrapper>
        {cityLocation && (
          <Content
            city={cityLocation}
            temp={cityLocation.main.temp}
            feelsLike={cityLocation.main.feels_like}
            index={120}
          />
        )}
        {currentCities &&
          currentCities.length > 0 &&
          currentCities.map((city, index) => (
            <Content
              key={city.id}
              city={city}
              temp={city.main.temp}
              feelsLike={city.main.feels_like}
              index={index}
            />
          ))}
      </Wrapper>
    </>
  );
};
