import { useState } from 'react';

export function useSwipe(onSwipeLeft, onSwipeRight) {
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const difference = touchStartX - touchEndX;
    const swipeThreshold = 50; // Minimum drag length in pixels

    if (difference > swipeThreshold) {
      // Swiped Left -> Load next slide
      onSwipeLeft?.();
    } else if (difference < -swipeThreshold) {
      // Swiped Right -> Load previous slide
      onSwipeRight?.();
    }
    // Clean up
    setTouchStartX(0);
    setTouchEndX(0);
  };

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
}
