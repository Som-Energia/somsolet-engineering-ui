import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import SOMSOLET_CA from "./locale/somsolet-ca.json";
import SOMSOLET_ES from "./locale/somsolet-es.json";
import SOMSOLET_GL from "./locale/somsolet-gl.json";
import SOMSOLET_EU from "./locale/somsolet-eu.json";

const resources = {
  ca: {
    translation: { ...SOMSOLET_CA },
  },
  es: {
    translation: { ...SOMSOLET_ES },
  },
  gl: {
    translation: { ...SOMSOLET_GL },
  },
  eu: {
    translation: { ...SOMSOLET_EU },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "es",
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
