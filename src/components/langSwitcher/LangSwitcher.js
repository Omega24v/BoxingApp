import React from 'react';
import {Dropdown, Form} from 'react-bootstrap';
import {DEFAULT_LOCALE, LOCALES} from '../../translation/locales';
import FlagImg from '../icons/FlagImg';
import './LangSwitcher.sass';
import {setLocale} from "../../store/reducers/timer/timerReducer";
import {setData} from "../../utils/localStorage/localStorage";
import {useAppDispatch, useAppSelector} from "../../hooks/common/redux-hooks";

const LangSwitcher = () => {

  const locale = useAppSelector((state) => state.locale);
  const dispatch = useAppDispatch();

  const handleChange = (code) => {
    if (!code) {
      dispatch(setLocale(DEFAULT_LOCALE));
      setData("lang", DEFAULT_LOCALE);
    } else {
      dispatch(setLocale(code));
      setData("lang", code);
    }
  }

  return (
    <Form className="me-2">
      <Dropdown className="lang-switcher" value={locale}>
        <Dropdown.Toggle className="lang-switcher__toggler d-flex align-items-center">
          <div className="d-flex align-items-center lang-switcher__flag">
            <FlagImg code={locale}/>
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu align="end">
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

export default LangSwitcher;
