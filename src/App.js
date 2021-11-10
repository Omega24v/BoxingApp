import React from "react";
import Timer from "./components/timer/Timer";
import { Container, Row } from "react-bootstrap";
import './App.sass';

function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Timer/>
        </Row>
    </Container>
    </div>
  );
}

export default App;
