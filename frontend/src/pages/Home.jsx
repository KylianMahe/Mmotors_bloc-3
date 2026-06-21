import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

const advantages = [
  {
    icon: "◇",
    title: "Fiable & sécurisé",
    text: "Vos informations et vos justificatifs sont protégés à chaque étape du dossier.",
  },
  {
    icon: "▣",
    title: "Large choix",
    text: "Achat ou location longue durée, avec des véhicules adaptés à chaque besoin.",
  },
  {
    icon: "✓",
    title: "Démarches simplifiées",
    text: "Un parcours clair pour déposer un dossier et suivre son avancement facilement.",
  },
  {
    icon: "↗",
    title: "Accompagnement",
    text: "Un espace client et une administration pour gérer les demandes rapidement.",
  },
];

const stats = [
  { value: "25+", label: "véhicules disponibles" },
  { value: "100%", label: "dossier digital" },
  { value: "24/7", label: "suivi en ligne" },
  { value: "2", label: "modes : achat & location" },
];

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="pill-label">Vente & location longue durée</p>
          <h1>
            Trouvez le véhicule qui <span>vous correspond</span>
          </h1>
          <p className="hero-text">
            Recherchez un véhicule d’occasion, choisissez achat ou location, puis suivez votre
            dossier depuis un espace client simple et sécurisé.
          </p>
          <div className="actions hero-actions">
            <Link className="button button-primary" to="/search">
              Rechercher un véhicule
            </Link>
            <Link className="button button-outline" to={user ? "/applications" : "/login"}>
              Suivre un dossier
            </Link>
          </div>
          <div className="trust-row" aria-label="Garanties M-Motors">
            <span>Service sécurisé</span>
            <span>Données protégées</span>
            <span>Accompagnement de A à Z</span>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="car-blob">
            <div className="car-shape">
              <div className="car-roof" />
              <div className="car-body" />
              <div className="wheel wheel-left" />
              <div className="wheel wheel-right" />
            </div>
          </div>
          <div className="floating-card">
            <strong>Véhicules vérifiés</strong>
            <span>Sélectionnés pour leur qualité et leur fiabilité.</span>
          </div>
        </div>
      </section>

      <section className="feature-grid" aria-label="Avantages">
        {advantages.map((item) => (
          <article className="feature-card" key={item.title}>
            <span className="feature-icon">{item.icon}</span>
            <div>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="stats-band" aria-label="Indicateurs">
        {stats.map((item) => (
          <div className="stat-item" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
