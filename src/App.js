import React from "react";
import Timer from "./components/timer/Timer";
import { Container, Row, Col } from "react-bootstrap";
import './App.sass';

function App() {
  return (
    <div className="App">
      <Container>
        <Row className="justify-content-center">
          <Col lg={10} className="timer py-5">
            <Timer/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App
