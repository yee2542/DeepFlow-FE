import { RefObject, useEffect, useRef } from 'react';

export const useEventListener = <T extends HTMLElement = HTMLDivElement>(
  eventName: keyof WindowEventMap | keyof DocumentEventMap,
  handler: (event: Event) => void,
  element?: RefObject<T>,
): void => {
  const savedHandler = useRef<(event: Event) => void>();

  useEffect(() => {
    const targetElement: T | Window = element?.current || window;
    if (!(targetElement && targetElement.addEventListener)) return;

    if (savedHandler.current !== handler) {
      savedHandler.current = handler;
    }

    const eventListener = (event: Event) => {
      if (savedHandler?.current) {
        savedHandler.current(event);
      }
    };

    targetElement.addEventListener(eventName, eventListener);
    return () => {
      targetElement.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element, handler]);
};
