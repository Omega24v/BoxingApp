import {LOCALES} from "../../translation/locales";

export default function getInitialLocale() {
  const savedLocale = localStorage.getItem("lang");
  return savedLocale || LOCALES.EN.code;
}
