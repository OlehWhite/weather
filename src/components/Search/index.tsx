import { FC, useState, ChangeEvent, FormEvent } from "react";
import { Container, Form, Input, Button } from "./style";
import { Content } from "./Content";

export const Search: FC = () => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddButtonClick = (event: FormEvent) => {
    event.preventDefault();

    console.log("Введене значення:", inputValue);
  };

  return (
    <>
      <Container>
        <Form>
          <Input type="text" value={inputValue} onChange={handleChange} />
          <Button type="button" onClick={handleAddButtonClick}>
            Add
          </Button>
        </Form>
      </Container>
      <Content />
    </>
  );
};
