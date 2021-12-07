import React from 'react';
import style from './Copyright.module.sass';

const Copyright = () => {
  return (
    <div className={style.copyright}>
      © {new Date().getFullYear()} Timer
    </div>
  );
};

export default Copyright;