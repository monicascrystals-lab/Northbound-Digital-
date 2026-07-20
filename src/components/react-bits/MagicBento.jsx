import './magic-bento.css';

function MagicBento({ items }) {
  return (
    <div className="magic-bento" role="list">
      {items.map((item) => (
        <article className="bento-card" key={item.title} role="listitem">
          <img src={item.image} alt={item.title} />
          <div className="bento-content">
            <p className="bento-category">{item.category}</p>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <a className="btn btn-secondary" href={item.href} target="_blank" rel="noreferrer">
              View Website
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}

export default MagicBento;
