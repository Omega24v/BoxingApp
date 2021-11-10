import React from "react";
import Timer from "./components/timer/Timer";
import { Container, Row } from "react-bootstrap";
import './App.sass';

function App() {
  return (
    <Container>
      <Row>
        <Timer/>
      </Row>
    </Container>
  );
}

export default App;
