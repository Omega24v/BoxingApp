import React, { useState } from "react";
import {Container, Row, Col} from "react-bootstrap";
import { IntlProvider } from "react-intl";
import Timer from "./components/timer/Timer";
import ToggleTheme from "./components/theme/ToggleTheme";
import SoundSwitcher from "./components/soundSwitcher/SoundSwitcher";
import { LOCALES } from './translation/locales';
import { messages } from './translation/messages';
import LangSwitcher from "./components/langSwitcher/LangSwitcher";
import './App.sass';

function App() {

  const [currentLocale, setCurrentLocale] =  useState(getInitialLocal());
  
  const handleChange = (e) => {
    setCurrentLocale(e.target.dataset.value);
    localStorage.setItem("lang", e.target.dataset.value);
  }

  function getInitialLocal() {
    const savedLocale = localStorage.getItem("lang");
    return savedLocale || LOCALES.ENGLISH;
  }

  return (
    <IntlProvider messages={messages[currentLocale]} locale={currentLocale} defaultLocale={LOCALES.ENGLISH}>
      <div className="App">
        <Container>
          <Row className="mt-2">
            <Col lg={12} className="d-flex justify-content-between align-items-center">
              <ToggleTheme/>
              <LangSwitcher currentLocale={currentLocale} handleChange={handleChange}/>
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
    </IntlProvider>
  );
}

export default App
