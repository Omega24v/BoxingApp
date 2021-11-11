import React from "react";
import Timer from "./components/timer/Timer";
import TimerEdit from "./components/timerEdit/TimerEdit";
import TimersList from "./components/timersList/TimersList";
import AddTimer from "./components/addTimer/AddTimer";
import { Container, Row } from "react-bootstrap";
import './App.sass';

function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Timer/>
          <TimerEdit/>
          <AddTimer/>
          <TimersList/>
        </Row>
      </Container>
    </div>
  );
}

export default App
