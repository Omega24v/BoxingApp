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
import Copyright from "./components/copyright/Сopyright";

function App() {

  const [currentLocale, setCurrentLocale] =  useState(getInitialLocal());
  const defaultLoc = LOCALES.EN.code;

  function getInitialLocal() {
    const savedLocale = localStorage.getItem("lang");
    return savedLocale || LOCALES.EN.code;
  }

  return (
    <IntlProvider messages={messages[currentLocale]} locale={currentLocale} defaultLocale={defaultLoc}>
      <div className="App">
        <Container>
          <Row className="mt-2">
            <Col lg={12} className="d-flex justify-content-between align-items-center">
              <ToggleTheme/>
              <LangSwitcher currentLocale={currentLocale} setCurrentLocale={setCurrentLocale} defaultLoc={defaultLoc} />
              <SoundSwitcher/>
            </Col>
          </Row>
          <div className="justify-content-center">
            <Col lg={12} className="timer my-2 p-3">
              <Timer/>
            </Col>
          </div>
          <Copyright/>
        </Container>
      </div>
    </IntlProvider>
  );
}

export default App