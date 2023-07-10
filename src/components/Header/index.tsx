import { FC } from "react";
import { Container } from "./style";

export const Header: FC = () => {
  return (
    <Container>
      <select>
        <option value="en">EN</option>
        <option value="uk">UA</option>
        <option value="he">HW</option>
      </select>
    </Container>
  );
};
