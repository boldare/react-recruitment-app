export const submitOnEnter = submit => (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    submit();
    event.preventDefault();
  }
};
