import React from "react";
import { Container } from "./style";
import "./index.css";

import { Header } from "./components/Header";
import { Search } from "./components/Search";

function App() {
  return (
    <Container>
      <Header />
      <Search />
    </Container>
  );
}

export default App;
