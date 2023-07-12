import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Container, Option, Select } from "./style";
import IMGLanguage from "../../assets/icons/material-language.svg";

export const Header: FC = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem("selectedLanguage", selectedLanguage);
  };

  useEffect(() => {
    const selectedLanguage = localStorage.getItem("selectedLanguage");
    if (selectedLanguage) {
      i18n.changeLanguage(selectedLanguage);
    }
  }, [i18n]);

  return (
    <Container>
      <img src={IMGLanguage} alt="Language" title="Language" />
      <Select onChange={handleLanguageChange}>
        <Option value="en">EN</Option>
        <Option value="ua">UA</Option>
        <Option value="he">HE</Option>
      </Select>
    </Container>
  );
};
