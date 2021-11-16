import React from "react";
import Timer from "./components/timer/Timer";
import {Container, Row, Col} from "react-bootstrap";
import './App.sass';
import SoundSwitcher from "./components/soundSwitcher/SoundSwitcher";

function App() {
    return (
        <div className="App">
            <Container>
                <SoundSwitcher/>
                <Row className="justify-content-center">
                    <Col lg={10} className="timer mt-3 py-3">
                        <Timer/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App
