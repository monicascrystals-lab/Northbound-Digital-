import { useMemo, useState } from 'react';
import './magic-bento.css';

function MagicBentoCard({
  children,
  className = '',
  variant = 'default',
  interactive = true,
  spotlight = true,
  image,
  eyebrow,
  title,
  category,
  description,
  href,
  actionLabel = 'View Website',
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlightPosition, setSpotlightPosition] = useState({ x: 50, y: 50 });
  const [pressed, setPressed] = useState(false);

  const style = useMemo(() => ({
    '--spotlight-x': `${spotlightPosition.x}%`,
    '--spotlight-y': `${spotlightPosition.y}%`,
    transform: interactive ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${pressed ? -2 : 0}px)` : undefined,
  }), [interactive, pressed, spotlightPosition.x, spotlightPosition.y, tilt.x, tilt.y]);

  const handleMove = (event) => {
    if (!interactive) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    setSpotlightPosition({ x, y });
    setTilt({
      x: ((bounds.height / 2 - (event.clientY - bounds.top)) / bounds.height) * -3,
      y: ((event.clientX - bounds.left - bounds.width / 2) / bounds.width) * 3,
    });
  };

  const resetMotion = () => {
    if (!interactive) return;
    setTilt({ x: 0, y: 0 });
    setSpotlightPosition({ x: 50, y: 50 });
    setPressed(false);
  };

  const cardClassName = ['magic-bento-card', variant, interactive ? 'interactive' : 'static', spotlight ? 'has-spotlight' : '', className].filter(Boolean).join(' ');

  return (
    <article
      className={cardClassName}
      style={style}
      onMouseMove={handleMove}
      onMouseEnter={() => interactive && setPressed(false)}
      onMouseLeave={resetMotion}
      onMouseDown={() => interactive && setPressed(true)}
      onMouseUp={() => interactive && setPressed(false)}
      onBlur={resetMotion}
    >
      <div className="magic-bento-glow" />
      {image ? (
        <div className="magic-bento-media">
          <img src={image} alt={title || 'Decorative preview'} />
        </div>
      ) : null}
      <div className="magic-bento-body">
        {eyebrow ? <p className="magic-bento-eyebrow">{eyebrow}</p> : null}
        {title ? <h3>{title}</h3> : null}
        {category ? <p className="magic-bento-category">{category}</p> : null}
        {description ? <p className="magic-bento-description">{description}</p> : null}
        {children}
        {href ? (
          <a className="btn btn-secondary magic-bento-link" href={href} target="_blank" rel="noreferrer">
            {actionLabel}
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default MagicBentoCard;
