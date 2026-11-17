"use strict";

// ПЗ 31 — STUDY SPACE
// В этом файле нужно выполнить только пять TODO.
// HTML и CSS уже готовы. Не меняйте id элементов.

// 1. Находим элементы страницы
const nameInput = document.querySelector("#name-input");
const saveNameButton = document.querySelector("#save-name");
const greeting = document.querySelector("#greeting");
const nameStatus = document.querySelector("#name-status");

const noteInput = document.querySelector("#note-input");
const saveNoteButton = document.querySelector("#save-note");
const clearNoteButton = document.querySelector("#clear-note");
const noteStatus = document.querySelector("#note-status");

// 2. Готовые функции для cookies.
// Их не нужно изменять: просто используйте setCookie() и getCookie().
function setCookie(key, value, days) {
  const seconds = days * 24 * 60 * 60;
  document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; max-age=${seconds}; path=/; SameSite=Lax`;
}

function getCookie(key) {
  const prefix = `${encodeURIComponent(key)}=`;
  const found = document.cookie
    .split("; ")
    .find((item) => item.startsWith(prefix));
  return found ? decodeURIComponent(found.slice(prefix.length)) : "";
}
// 3. Восстанавливаем данные при открытии страницы
const savedNote = localStorage.getItem("pz31-note");

if (savedNote !== null) {
  noteInput.value = savedNote;
  noteStatus.textContent = "Заметка восстановлена из localStorage.";
}

// TODO 2. Восстанавливаем имя из cookie
const savedName = getCookie("pz31-name");

if (savedName !== "") {
  nameInput.value = savedName;
  greeting.textContent = `Привет, ${savedName}!`;
  nameStatus.textContent = "Имя восстановлено из cookie.";
}
// 4. Сохраняем заметку
saveNoteButton.addEventListener("click", () => {
  const note = noteInput.value.trim();

  if (note === "") {
    noteStatus.textContent = "Сначала напишите заметку.";
    return;
  }

  // TODO 3. Сохраняем заметку в localStorage
  localStorage.setItem("pz31-note", note);

  noteStatus.textContent = "Заметка сохранена в браузере.";
});

// 5. Удаляем заметку
clearNoteButton.addEventListener("click", () => {
  // TODO 4. Удаляем заметку из localStorage
  localStorage.removeItem("pz31-note");

  noteInput.value = "";
  noteStatus.textContent = "Заметка удалена.";
});

// 6. Запоминаем имя в cookie
saveNameButton.addEventListener("click", () => {
  const name = nameInput.value.trim();

  if (name === "") {
    nameStatus.textContent = "Введите имя.";
    return;
  }

  // TODO 5. Сохраняем имя в cookie на 7 дней
  setCookie("pz31-name", name, 7);

  greeting.textContent = `Привет, ${name}!`;
  nameStatus.textContent = "Имя сохранено в cookie.";
});
