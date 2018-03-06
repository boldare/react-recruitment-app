export const flattenFunction = (nestedMessages, prefix = '') => Object.keys(nestedMessages).reduce(
  (acc, key) => {
    const messages = { ...acc };
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenFunction(value, prefixedKey));
    }

    return messages;
  },
  {},
);

export default flattenFunction;
