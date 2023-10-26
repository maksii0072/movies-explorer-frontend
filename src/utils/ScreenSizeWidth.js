import { useState, useEffect } from "react";

function getWindowSize() {
  const { innerWidth: width } = window;
  return { width };
}

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getWindowSize());
    };

    window.addEventListener('resize', handleResize);
  }, [])

  return windowSize;
}