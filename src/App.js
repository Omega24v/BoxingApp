import React from "react";
import Timer from "./components/timer/Timer";
import {Container, Row, Col} from "react-bootstrap";
import ToggleTheme from "./components/theme/ToggleTheme";
import './App.sass';

function App() {
  return (
    <div className="App">
      <Container>
        <Row className="justify-content-center">
          <ToggleTheme/>
          <Col lg={10} className="timer my-3 p-4">
            <Timer/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App
