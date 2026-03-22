

'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollArrowNavigator({
  topPath,
  bottomPath,
  topIcon: TopIcon = ChevronUp,
  bottomIcon: BottomIcon = ChevronDown,
  threshold = 250,
}) {
  const router = useRouter();

  const [topStretch, setTopStretch] = useState(0);
  const [bottomStretch, setBottomStretch] = useState(0);
  const [topTriggered, setTopTriggered] = useState(false);
  const [bottomTriggered, setBottomTriggered] = useState(false);

  const startY = useRef(null);
  const resetTimer = useRef(null);

  const gestureActive = useRef(false);
  const scrollStartAtTop = useRef(false);
  const scrollStartAtBottom = useRef(false);

  const resetAll = () => {
    setTopStretch(0);
    setBottomStretch(0);
    setTopTriggered(false);
    setBottomTriggered(false);
    scrollStartAtTop.current = false;
    scrollStartAtBottom.current = false;
    gestureActive.current = false;
  };

  const handleScrollEnd = () => {
    if (topStretch >= threshold && !topTriggered) {
      setTopTriggered(true);
      router.push(topPath);
    } else if (bottomStretch >= threshold && !bottomTriggered) {
      setBottomTriggered(true);
      router.push(bottomPath);
    }

    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => {
      resetAll();
    }, 200);
  };

  const handleWheel = (e) => {
    if (!gestureActive.current) {
      gestureActive.current = true;
      const atTop = window.scrollY === 0;
      const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;

      scrollStartAtTop.current = atTop && e.deltaY < 0;
      scrollStartAtBottom.current = atBottom && e.deltaY > 0;
    }

    if (scrollStartAtTop.current && e.deltaY < 0) {
      setTopStretch((prev) => Math.min(prev + Math.abs(e.deltaY), threshold));
    } else if (scrollStartAtBottom.current && e.deltaY > 0) {
      setBottomStretch((prev) => Math.min(prev + Math.abs(e.deltaY), threshold));
    }

    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => {
      gestureActive.current = false;
      handleScrollEnd();
    }, 100);
  };

  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
    scrollStartAtTop.current = window.scrollY === 0;
    scrollStartAtBottom.current = window.innerHeight + window.scrollY >= document.body.offsetHeight;
  };

  const handleTouchMove = (e) => {
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - startY.current;

    if (scrollStartAtTop.current && deltaY > 0) {
      setTopStretch(Math.min(deltaY, threshold));
    } else if (scrollStartAtBottom.current && deltaY < 0) {
      setBottomStretch(Math.min(Math.abs(deltaY), threshold));
    }
  };

  const handleTouchEnd = () => {
    handleScrollEnd();
  };

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [topStretch, bottomStretch, topTriggered, bottomTriggered]);

  return (
    <>
      {/* Top Arrow */}
      <motion.div
        className={clsx(
          'fixed top-0 left-1/2 transform -translate-x-1/2 z-200 flex items-center justify-center '
        )}
        animate={{ opacity: topStretch > 0 ? 0.6 : 0.1, height: 30 + topStretch }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <motion.div
          className={clsx(
            'rounded-full flex items-center justify-center',
            topStretch >= threshold ? 'bg-red-600' : 'bg-green-500'
          )}
          animate={{ scale: 1 + topStretch / 500 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <TopIcon className="text-white w-6 h-6" />
        </motion.div>
      </motion.div>

      {/* Bottom Arrow */}
      <motion.div
        className={clsx(
          'fixed bottom-0 left-1/2 transform -translate-x-1/2 z-200 flex items-center justify-center'
        )}
        animate={{ opacity: bottomStretch > 0 ? 0.6 : 0.1, height: 30 + bottomStretch }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <motion.div
          className={clsx(
            'rounded-full flex items-center justify-center',
            bottomStretch >= threshold ? 'bg-red-600' : 'bg-green-500'
          )}
          animate={{ scale: 1 + bottomStretch / 500 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <BottomIcon className="text-white w-6 h-6" />
        </motion.div>
      </motion.div>
    </>
  );
}
