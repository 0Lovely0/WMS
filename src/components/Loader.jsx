"use client";

import React, { useState, useEffect } from 'react';

const FullScreenShiningLoader = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000); // Hide loader after 1 second

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  if (!showLoader) return null; // If loader is finished, render nothing

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/95 bg-opacity-20 z-[100]">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Background */}
        <div className="absolute top-0 left-0 w-full h-full bg-transparent"></div>

        {/* Loader */}
        <div className="relative flex items-center justify-center">
          {/* Spinning circle */}
          <div className="animate-spin rounded-full h-48 w-48 border-t-8 border-green-600 border-solid"></div>

          {/* Static text inside */}
          <div className="absolute">
            <span className="text-neutral-800 font-bold text-2xl">Please Wait...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullScreenShiningLoader;
