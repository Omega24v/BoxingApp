import React from "react";
import Timer from "./components/timer/Timer";
import {Container, Row, Col} from "react-bootstrap";
import ToggleTheme from "./components/theme/ToggleTheme";
import './App.sass';

function App() {
  return (
    <div className="App">
      <Container>
        <Row className="mt-2">
          <Col lg={12}>
            <ToggleTheme/>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={12} className="timer my-3 p-4">
            <Timer/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App
