import React from "react";
import Timer from "./components/timer/Timer";
import {Container, Row, Col} from "react-bootstrap";
import ToggleTheme from "./components/theme/ToggleTheme";
import './App.sass';
import SoundSwitcher from "./components/soundSwitcher/SoundSwitcher";
import { IntlProvider } from "react-intl";
import { LOCALES } from './translation/locales'
import { messages } from './translation/messages'

function App() {
  console.dir(IntlProvider)
  const locale = LOCALES.ENGLISH

  return (
    <IntlProvider messages={messages[locale]} locale={locale} defaultLocale={LOCALES.ENGLISH}>
      <div className="App">
        <Container>
          <Row className="mt-2">
            <Col lg={12} className="d-flex justify-content-between">
              <ToggleTheme/>
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
