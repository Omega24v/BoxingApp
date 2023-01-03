import React from 'react'
import FlagUA from '../../icons/UA.svg';
import FlagGB from '../../icons/GB.svg';
import FlagES from '../../icons/ES.svg';
import { Image } from 'react-bootstrap';

interface IProps {
  code: string
}

  function FlagImg({code}: IProps) {
    const getSvg = (code: string) => {
      switch(code) {
        case 'UK' :
          return FlagUA
        case 'EN' :
          return FlagGB
        case 'ES' :
          return FlagES
        default :
          return FlagGB
    }
  }

  return (
    <Image src={getSvg(code)} width="39" height="39" className="switcher-flag" alt="lang-flag" />
  )
}

export default FlagImg
