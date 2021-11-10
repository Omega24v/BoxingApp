import React from "react";
import Timer from "./components/timer/Timer";
import TimerEdit from "./components/timerEdit/TimerEdit";
import TimersList from "./components/timersList/TimersList";
import './App.css';

function App() {
    return (
        <div className="App">
            <Timer/>
            <TimerEdit/>
            <TimersList/>
        </div>
    );
}

export default App;
