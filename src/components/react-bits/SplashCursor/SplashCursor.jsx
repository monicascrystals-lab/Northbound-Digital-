import { useEffect, useMemo, useRef, useState } from 'react';
import './splash-cursor.css';

function SplashCursor({
  DENSITY_DISSIPATION = 2.5,
  VELOCITY_DISSIPATION = 2.5,
  PRESSURE = 0.1,
  CURL = 7,
  SPLAT_RADIUS = 0.33,
  SPLAT_FORCE = 5000,
  COLOR_UPDATE_SPEED = 10,
  SHADING = true,
  RAINBOW_MODE = false,
  COLOR = '#020748',
}) {
  const canvasRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const reduceMotion = mediaQuery.matches;
    setEnabled(!coarsePointer && !reduceMotion);

    const handleChange = (event) => {
      setEnabled(!event.matches && !window.matchMedia('(pointer: coarse)').matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let mouseX = 0;
    let mouseY = 0;
    let pointerActive = false;
    let frameId = 0;
    let lastTime = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
      ctx.clearRect(0, 0, width, height);
    };

    const onPointerMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      pointerActive = true;
    };

    const onPointerLeave = () => {
      pointerActive = false;
    };

    const animate = (time) => {
      const delta = Math.min(32, time - lastTime || 16);
      lastTime = time;

      if (pointerActive) {
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 8, 0, Math.PI * 2);
        ctx.fillStyle = COLOR;
        ctx.globalAlpha = 0.16;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      frameId = window.requestAnimationFrame(animate);
      if (delta > 0) {
        // subtle interactive trail without interrupting clicks
      }
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseleave', onPointerLeave);
    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseleave', onPointerLeave);
    };
  }, [COLOR, enabled]);

  const canvasClassName = useMemo(() => (enabled ? 'splash-cursor-canvas enabled' : 'splash-cursor-canvas'), [enabled]);

  return <canvas ref={canvasRef} className={canvasClassName} aria-hidden="true" />;
}

export default SplashCursor;
