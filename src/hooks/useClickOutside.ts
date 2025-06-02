import { RefObject, useEffect } from 'react';

/**
 * Custom hook that triggers a callback when a click is detected outside of the provided ref
 * @param ref - The ref of the element to detect clicks outside of
 * @param callback - The function to call when a click outside is detected
 */
const useClickOutside = (
  ref: RefObject<HTMLElement>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};

export default useClickOutside;