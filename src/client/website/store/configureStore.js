import configureProd from './configureStore.prod';
import configureDev from './configureStore.dev';

export default (...args) => {
  if (process.env.NODE_ENV === 'production') {
    return configureProd(...args);
  }

  return configureDev(...args);
};
