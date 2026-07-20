import { useEffect, useMemo, useRef, useState } from 'react';
import './plasma.css';

function Plasma() {
  const ref = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  const className = useMemo(() => `plasma ${reducedMotion ? 'reduced' : ''}`.trim(), [reducedMotion]);

  return <div ref={ref} className={className} aria-hidden="true" />;
}

export default Plasma;
