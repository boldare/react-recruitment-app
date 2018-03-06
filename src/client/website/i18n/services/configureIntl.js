import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import pl from 'react-intl/locale-data/pl';

export default () => {
  addLocaleData([...en, ...pl]);
};
