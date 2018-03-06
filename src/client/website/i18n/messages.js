import en from './translations/en.json';
import pl from './translations/pl.json';
import flattenMessages from './services/flattenMessages';

const enUS = flattenMessages(en);
const plPL = flattenMessages(pl);

/* eslint-disable quote-props */
export default {
  'en': enUS,
  'en-US': enUS,
  'en_US': enUS,
  'en_GB': enUS,
  'en-GB': enUS,
  'pl': plPL,
  'pl_PL': plPL,
  'pl-PL': plPL
};
