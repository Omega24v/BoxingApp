import React from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import { LOCALES } from '../../translation/locales';
import FlagImg from '../icons/FlagImg';
import './LangSwitcher.sass';

const LangSwitcher = (props) => {

  const { currentLocale, setCurrentLocale, defaultLoc} = props;
  const handleChange = (code) => {
    if (!code) {
      setCurrentLocale(defaultLoc); 
      localStorage.setItem("lang", defaultLoc);
    } else {
      setCurrentLocale(code);
      localStorage.setItem("lang", code);
    }
  }

  return (
    <Form>
      <Dropdown className="lang-switcher" value={currentLocale}>
        <Dropdown.Toggle variant="light" className="lang-switcher__toggler p-2 d-flex align-items-center">
          <div className="d-flex align-items-center">
            <FlagImg code={currentLocale}/>
            <span className="switcher-title">{LOCALES[currentLocale].name}</span>
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {Object.keys(LOCALES).map((lang) => (
            <Dropdown.Item key={lang} onClick={() => {handleChange(LOCALES[lang].code)}}>
              <div className="d-flex align-items-center">
                <FlagImg code={lang}/>
                <span className="switcher-title">{LOCALES[lang].name}</span>
              </div>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Form>
  )
}

export default LangSwitcher