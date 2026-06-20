// Thin AJAX layer over the Web Service, using the Fetch API.
// All potion data on the site is retrieved through these functions.

const TOKEN_KEY = "potions_admin_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Public: list all potions.
export async function fetchPotions() {
  const res = await fetch("/api/potions");
  if (!res.ok) {
    throw new Error("Não foi possível carregar as poções.");
  }
  return res.json();
}

// Admin: log in with the shop password, storing the returned token.
export async function login(password) {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Falha no login.");
  }
  const { token } = await res.json();
  setToken(token);
  return token;
}

export async function logout() {
  await fetch("/api/logout", {
    method: "POST",
    headers: { ...authHeaders() },
  }).catch(() => {});
  clearToken();
}

// Admin: register a new potion.
export async function createPotion(potion) {
  const res = await fetch("/api/potions", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(potion),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Não foi possível cadastrar a poção.");
  }
  return res.json();
}

// Admin: remove a potion by id.
export async function deletePotion(id) {
  const res = await fetch(`/api/potions/${id}`, {
    method: "DELETE",
    headers: { ...authHeaders() },
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Não foi possível remover a poção.");
  }
}
