import { useEffect, useState } from "react";
import { fetchPotions } from "../api.js";
import PotionCard from "../components/PotionCard.jsx";

export default function HomePage() {
  const [potions, setPotions] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  // Retrieve the registered potions from the Web Service via AJAX (fetch).
  useEffect(() => {
    fetchPotions()
      .then((data) => {
        setPotions(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <>
      {/* Store description / hero */}
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">Poções &amp; Soluções</h1>
          <p className="hero__subtitle">
            A loja de poções mais respeitada do Beco da Última Saída. Desde 1867,
            a bruxa Innabelle Merigold prepara elixires artesanais para todo tipo
            de necessidade — da inspiração súbita à beleza eterna.
          </p>
          <a href="#produtos" className="hero__cta">
            Ver poções
          </a>
        </div>
      </section>

      {/* Store history with photos */}
      <section className="history" id="historia">
        <h2 className="section-title">Nossa História</h2>
        <div className="history__grid">
          <div className="history__photos">
            <img
              src="https://i.ibb.co/s9Lyvj8/rsz-verdades.png"
              alt="Caldeirão antigo da loja"
              className="history__photo"
              loading="lazy"
            />
            <img
              src="https://i.ibb.co/ZzS7xb2/rsz-sky.png"
              alt="Poção histórica"
              className="history__photo"
              loading="lazy"
            />
          </div>
          <div className="history__text">
            <p>
              Fundada em <strong>1867</strong>, a Poções &amp; Soluções nasceu de
              um pequeno caldeirão na cozinha de Innabelle Merigold. O que começou
              como uma curiosidade entre vizinhos bruxos rapidamente se tornou a
              referência em elixires de qualidade no Beco da Última Saída.
            </p>
            <p>
              Após a pandemia, Merigold decidiu levar suas criações para o mundo
              digital, garantindo que magia de verdade chegue à porta de cada
              cliente — sem depender de aplicativos de entrega trouxas.
            </p>
            <p>
              Cada poção é preparada à mão, com ingredientes selecionados e mais
              de século e meio de tradição.
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="products" id="produtos">
        <h2 className="section-title">Poções Disponíveis</h2>

        {status === "loading" && (
          <p className="state-message">Carregando poções…</p>
        )}
        {status === "error" && (
          <p className="state-message state-message--error">
            Não foi possível carregar as poções. Verifique se o servidor está
            em execução.
          </p>
        )}
        {status === "ready" && potions.length === 0 && (
          <p className="state-message">Nenhuma poção cadastrada no momento.</p>
        )}

        <div className="potion-grid">
          {potions.map((potion) => (
            <PotionCard key={potion.id} potion={potion} />
          ))}
        </div>
      </section>
    </>
  );
}
