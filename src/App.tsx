import React from "react";
import { Container } from "./style";
import "./index.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

import { Header } from "./components/Header";
import { Search } from "./components/Search";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Container>
        <Header />
        <Search />
      </Container>
    </I18nextProvider>
  );
}

export default App;
