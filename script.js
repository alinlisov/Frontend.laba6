"use strict";
// Варіант 14: picture (1), postcode (6), city (4), name (2), email (7).
const API_URL = "https://randomuser.me/api/";
const button = document.getElementById("load-user");
const status = document.getElementById("status");
const profile = document.getElementById("profile");

function showUser(user) {
  if (!user || !user.name || !user.location || !user.picture) {
    throw new Error("API повернув неповні дані користувача.");
  }

  const fullName = [user.name.first, user.name.last].filter(Boolean).join(" ");
  const location = user.location;
  const picture = document.getElementById("picture");

  picture.src = user.picture.large;
  picture.alt = `Фотографія: ${fullName}`;
  document.getElementById("name").textContent = fullName || "Не вказано";
  document.getElementById("city").textContent = location.city ?? "Не вказано";
  document.getElementById("postcode").textContent = String(location.postcode ?? "Не вказано");
  document.getElementById("email").textContent = user.email ?? "Не вказано";
  profile.hidden = false;
}

function loadUser() {
  button.disabled = true;
  status.classList.remove("error");
  status.textContent = "Завантаження даних із Random User API…";

  // fetch повертає Promise<Response>; response.json() також асинхронний.
  fetch(API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: не вдалося отримати дані.`);
      }
      return response.json();
    })
    .then((data) => {
      if (!Array.isArray(data.results) || !data.results[0]) {
        throw new Error("Відповідь API не містить користувача.");
      }
      showUser(data.results[0]);
      status.textContent = "Дані успішно отримано. Натисніть кнопку для нового користувача.";
    })
    .catch((error) => {
      status.classList.add("error");
      status.textContent = `Помилка завантаження: ${error.message}`;
    })
    .finally(() => {
      button.disabled = false;
    });
}
button.addEventListener("click", loadUser);
