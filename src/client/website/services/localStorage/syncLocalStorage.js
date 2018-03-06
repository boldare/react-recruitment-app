function getStorage() {
  let storage;

  try {
    localStorage.setItem('storageTest', '');
    localStorage.removeItem('storageTest');
    storage = localStorage;
  } catch (ignored) {
    class TemporaryStorage {
      constructor() {
        this.store = {};
      }

      setItem(key, value) {
        this.store[key] = value;
      }

      clear() {
        this.store = {};
      }

      getItem(key) {
        return this.store[key];
      }

      removeItem(key) {
        delete this.store[key];
      }
    }
    storage = new TemporaryStorage();
  }

  return storage;
}

const syncLocalStorage = getStorage();

export default syncLocalStorage;
