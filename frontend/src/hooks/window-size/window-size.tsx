import { useEffect, useState } from '../hooks';

interface IWindowSize {
  width?: number;
  height?: number;
}

export const useWindowSize = (): IWindowSize => {
  const [windowSize, setWindowSize] = useState<IWindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = (): void => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return (): void => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};
