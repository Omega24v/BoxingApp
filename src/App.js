import React from "react";
import Timer from "./components/timer/Timer";
import TimerEdit from "./components/timerEdit/TimerEdit";
import TimersList from "./components/timersList/TimersList";
import AddTimer from "./components/addTimer/AddTimer";
import './App.sass';

function App() {
    return (
        <div className="App">
            <Timer/>
            <TimerEdit/>
            <AddTimer/>
            <TimersList/>
        </div>
    );
}

export default App;
