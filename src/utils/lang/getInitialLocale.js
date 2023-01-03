import {LOCALES} from "../../translation/locales";
import {loadData} from "../localStorage/localStorage";

export default function getInitialLocale() {
  const savedLocale = loadData("lang");
  return savedLocale || LOCALES.EN.code;
}
