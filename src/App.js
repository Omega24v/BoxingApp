import React from "react";
import Timer from "./components/timer/Timer";
import {Container, Row, Col} from "react-bootstrap";
import ToggleTheme from "./components/theme/ToggleTheme";
import './App.sass';
import SoundSwitcher from "./components/soundSwitcher/SoundSwitcher";

function App() {
  return (
    <div className="App">
      <Container>
        <Row className="mt-2">
          <Col lg={12} className="d-flex justify-content-between">
            <ToggleTheme/>
            <SoundSwitcher/>
          </Col>
        </Row>
        <div className="justify-content-center">
          <Col lg={12} className="timer my-3 p-3">
            <Timer/>
          </Col>
        </div>
      </Container>
    </div>
  );
}

export default App
