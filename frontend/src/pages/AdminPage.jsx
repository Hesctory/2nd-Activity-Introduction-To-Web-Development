import { useEffect, useState } from "react";
import {
  fetchPotions,
  createPotion,
  deletePotion,
  login,
  logout,
  getToken,
} from "../api.js";

const EMPTY_FORM = { name: "", description: "", image: "", price: "" };

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(Boolean(getToken()));

  return (
    <section className="admin">
      <h1 className="section-title">Administração</h1>
      {loggedIn ? (
        <AdminDashboard onLogout={() => setLoggedIn(false)} />
      ) : (
        <LoginForm onSuccess={() => setLoggedIn(true)} />
      )}
    </section>
  );
}

function LoginForm({ onSuccess }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    try {
      await login(password);
      onSuccess();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <p className="login-form__hint">
        Área restrita à proprietária. Informe a senha de administração.
      </p>
      <label className="field">
        <span className="field__label">Senha</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          required
        />
      </label>
      {error && <p className="state-message state-message--error">{error}</p>}
      <button type="submit" className="button">
        Entrar
      </button>
    </form>
  );
}

function AdminDashboard({ onLogout }) {
  const [potions, setPotions] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  function load() {
    fetchPotions()
      .then(setPotions)
      .catch(() => setError("Não foi possível carregar as poções."));
  }

  useEffect(load, []);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleCreate(event) {
    event.preventDefault();
    setError("");
    setNotice("");
    try {
      await createPotion({
        name: form.name,
        description: form.description,
        image: form.image,
        price: Number(form.price),
      });
      setForm(EMPTY_FORM);
      setNotice("Poção cadastrada com sucesso!");
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Remover esta poção?")) return;
    setError("");
    setNotice("");
    try {
      await deletePotion(id);
      setNotice("Poção removida.");
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleLogout() {
    await logout();
    onLogout();
  }

  return (
    <div className="dashboard">
      <div className="dashboard__topbar">
        <span>Sessão de administração ativa.</span>
        <button type="button" className="button button--ghost" onClick={handleLogout}>
          Sair
        </button>
      </div>

      {error && <p className="state-message state-message--error">{error}</p>}
      {notice && <p className="state-message state-message--ok">{notice}</p>}

      {/* Register a new potion */}
      <form className="potion-form" onSubmit={handleCreate}>
        <h2 className="dashboard__heading">Cadastrar nova poção</h2>
        <label className="field">
          <span className="field__label">Nome</span>
          <input
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            required
          />
        </label>
        <label className="field">
          <span className="field__label">Descrição</span>
          <textarea
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            rows={3}
            required
          />
        </label>
        <label className="field">
          <span className="field__label">URL da imagem</span>
          <input
            value={form.image}
            onChange={(e) => updateField("image", e.target.value)}
            placeholder="https://…"
            required
          />
        </label>
        <label className="field">
          <span className="field__label">Preço (moedas)</span>
          <input
            type="number"
            min="0"
            step="1"
            value={form.price}
            onChange={(e) => updateField("price", e.target.value)}
            required
          />
        </label>
        <button type="submit" className="button">
          Cadastrar poção
        </button>
      </form>

      {/* List & remove potions */}
      <h2 className="dashboard__heading">Poções cadastradas</h2>
      <ul className="admin-list">
        {potions.map((potion) => (
          <li key={potion.id} className="admin-list__item">
            <img
              src={potion.image}
              alt={potion.name}
              className="admin-list__thumb"
            />
            <div className="admin-list__info">
              <strong>{potion.name}</strong>
              <span>{potion.price} moedas</span>
            </div>
            <button
              type="button"
              className="button button--danger"
              onClick={() => handleDelete(potion.id)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
