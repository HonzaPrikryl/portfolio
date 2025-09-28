'use client';
import { useState, useEffect } from 'react';

export const useIsTouchDevice = () => {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkIsTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouch(checkIsTouch);
  }, []);

  return isTouch;
};
