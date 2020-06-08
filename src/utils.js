import { breakpoints } from "./theme";
import actions from "./state/actions";

/**
 * Fromta date from ISO to YYYY/MM/DD
 * @returns {Boolean}
 */
export const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};

/**
 * Debounce helper, I use it for resize event handler
 * @returns {Function}
 */
export function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

/**
 * Check if isMobile matched,
 * I prefer to match a 960px sizes for trigger mobile layout
 * @returns {Boolean}
 */
export function isMobileSize() {
  if (window.matchMedia(`(max-width: ${breakpoints.m}px)`).matches) {
    return true;
  } else {
    return false;
  }
}

export const actionsToRecord = (type) =>
  [
    actions.ADD_TODO,
    actions.COMPLETE_TODO,
    actions.DELETE_TODO,
    actions.UPDATE_TODO,
  ].includes(type);

export const getValueFromLS = (key) => {
  try {
    if (typeof window === "undefined") {
      return null;
    }
    const item = window.localStorage.getItem(key);
    // If exist parse data or return intialValue
    return item !== null ? JSON.parse(item) : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const setValueToLS = (key, value) => {
  try {
    return window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

export const removeFromLS = (key) => localStorage.removeItem(key);
