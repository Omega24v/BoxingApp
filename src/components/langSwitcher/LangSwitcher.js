import React from 'react';
import { DropdownButton, Dropdown, Image } from 'react-bootstrap';
import { LOCALES } from '../../translation/locales';
import './LangSwitcher.sass'

const LangSwitcher = ({ currentLocale, handleChange }) => {

  const languages = [
    { name: 'English', code: LOCALES.ENGLISH },
    { name: 'Ukranian', code: LOCALES.UKRAINIAN },
  ]

  const flags = (lang) => {
    const lg = lang.substring(lang.length - 2)
    return `http://purecatamphetamine.github.io/country-flag-icons/3x2/${lg}.svg`
  }

  return (
    <>
      <Dropdown value={currentLocale}>
        <DropdownButton id="dropdown-basic-button" title="Change language">
          {languages.map(({ name, code }) => (
            <Dropdown.Item onClick={handleChange} key={code} data-value={code} >
              <Image src={flags(code)} className="switcher-flag" />{name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </Dropdown> 
    </>
  )
}

export default LangSwitcher