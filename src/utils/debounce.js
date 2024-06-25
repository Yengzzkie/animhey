import { useCallback } from 'react';

export const useDebounce = (func, delay) => {
  const debounce = useCallback(
    (...args) => {
      const timer = setTimeout(() => {
        func(...args);
      }, delay);
      return () => clearTimeout(timer);
    },
    [func, delay]
  );

  return debounce;
};
