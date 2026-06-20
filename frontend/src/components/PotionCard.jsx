export default function PotionCard({ potion }) {
  return (
    <article className="potion-card">
      <div className="potion-card__image-wrap">
        <img
          className="potion-card__image"
          src={potion.image}
          alt={potion.name}
          loading="lazy"
        />
      </div>
      <div className="potion-card__body">
        <h3 className="potion-card__name">{potion.name}</h3>
        <p className="potion-card__description">{potion.description}</p>
        <div className="potion-card__footer">
          <span className="potion-card__price">{potion.price} moedas</span>
          <button type="button" className="potion-card__buy">
            Comprar
          </button>
        </div>
      </div>
    </article>
  );
}
