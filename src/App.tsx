import React from 'react';
import {Col, Container} from 'react-bootstrap';
import Timer from './components/timer/Timer';
import Copyright from './components/copyright/Сopyright';
import './App.sass';
import {store} from "./store/rootReducer";
import {setData} from "./utils/localStorage/localStorage";

store.subscribe(() => {
  const timerReducerData = store?.getState()?.timerReducer;
  if (!timerReducerData) {return}
  setData(timerReducerData.locale, "lang");
  setData(timerReducerData.isSound, 'isSound');
  setData({
    currTimer: timerReducerData.currTimer,
    timers: [...timerReducerData.timers, timerReducerData.currTimer]
  }, 'data');
  setData({
    currTimer: timerReducerData.timers.length > 0 ? timerReducerData.currTimer : null,
    timers: timerReducerData.timers
  }, 'data');
  setData({
    currTimer: timerReducerData.currTimer,
    timers: timerReducerData.timers
  }, 'data');
  setData({
    timers: timerReducerData.timers,
    currTimer: timerReducerData.currTimer
  }, 'data');
})

function App() {
  return (
    <div className="App">
      <Container>
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
