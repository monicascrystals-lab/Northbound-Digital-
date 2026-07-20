import { useEffect, useRef } from 'react';
import './splash-cursor.css';

function SplashCursor() {
  const ref = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    if (prefersReducedMotion || isTouchDevice) {
      return undefined;
    }

    const cursor = ref.current;
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const onMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const tick = () => {
      cursorX += (mouseX - cursorX) * 0.16;
      cursorY += (mouseY - cursorY) * 0.16;
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    const frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return <div aria-hidden="true" ref={ref} className="splash-cursor" />;
}

export default SplashCursor;
