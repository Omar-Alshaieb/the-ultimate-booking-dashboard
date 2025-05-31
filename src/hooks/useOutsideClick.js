import { useEffect, useRef } from 'react';

export function useOutsideClick(handler, listenOnCapture = true) {
  const ref = useRef();
  useEffect(() => {
    const handleClick = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    };
    document.addEventListener('click', handleClick, listenOnCapture);
    return () =>
      document.removeEventListener('click', handleClick, listenOnCapture);
  }, [handler, listenOnCapture]);

  return ref;
}
