/**
 * Replacement for redux-saga's delay, which I can't seem to be able use as intended in order to set polling frequency
 * @param duration milliseconds to wait
 */
export const delay = (duration: number) => {
  const promise = new Promise(resolve => {
      setTimeout(() => resolve(true), duration)
  });
  return promise;
}