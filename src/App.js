import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Timer from './components/timer/Timer';
import Copyright from './components/copyright/Сopyright';
import './App.sass';

function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col
            lg={12}
            className="d-flex justify-content-between align-items-center"
          ></Col>
        </Row>
        <div className="justify-content-center">
          <Col lg={12} className="timer my-2 p-3">
            <Timer />
          </Col>
        </div>
        <Copyright />
      </Container>
    </div>
  );
}

export default App;
