import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Container, Form, Input, Button, Wrapper } from "./style";
import { FC, useState, ChangeEvent, FormEvent } from "react";
import { cities } from "../../store/city/thunks";
import { selectCities } from "../../store/city";
import { Content } from "./Content";

export const Search: FC = () => {
  const dispatch = useAppDispatch();
  const { cities: currentCity } = useAppSelector(selectCities);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddButtonClick = (event: FormEvent) => {
    event.preventDefault();
    dispatch(cities(inputValue));
  };

  return (
    <>
      <Container>
        <Form onSubmit={handleAddButtonClick}>
          <Input type="text" value={inputValue} onChange={handleChange} />
          <Button type="submit">Add</Button>
        </Form>
      </Container>
      <Wrapper>
        {currentCity &&
          currentCity.length > 0 &&
          currentCity.map((city, index) => (
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
