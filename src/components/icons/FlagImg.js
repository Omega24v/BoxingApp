import React from 'react'
import FlagUA from '../../icons/UA.svg';
import FlagGB from '../../icons/GB.svg';
import FlagES from '../../icons/ES.svg';
import { Image } from 'react-bootstrap';

  function FlagImg({code}) {
    const getSvg = (code) => {
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
    <Image src={getSvg(code)} width="22" height="14" className="switcher-flag" alt="lang-flag" />
  )
}

export default FlagImg
