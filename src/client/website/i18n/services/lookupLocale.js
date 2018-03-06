const navigatorLanguages = window.navigator.languages && navigator.languages[0];
const navigatorLanguage = window.navigator.language;
const navigatorUserLanguage = window.navigator.userLanguage;

export default (navLanguages = navigatorLanguages,
  navLanguage = navigatorLanguage,
  navUserLanguage = navigatorUserLanguage) => navLanguages || navLanguage || navUserLanguage || 'en-US';
