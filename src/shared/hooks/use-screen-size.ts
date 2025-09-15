import { useEffect, useState } from "react";

export const useScreenSize = (): {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
} => {
  const [size, setSize] = useState<{
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
  }>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setSize({
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024,
        isDesktop: width >= 1024,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};
