const roleButtons = document.querySelectorAll(".role-tabs button");
const loginInput = document.querySelector('input[name="login"]');
const passwordInput = document.querySelector("#password");
const passwordToggle = document.querySelector(".password-toggle");
const loginForm = document.querySelector(".login-form");

if (window.lucide) {
  window.lucide.createIcons();
}

const rolePlaceholders = {
  staff: "staff@carebridge.example",
  doctor: "doctor.id@carebridge.example",
  patient: "patient ID or email"
};

roleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    roleButtons.forEach((item) => {
      item.classList.toggle("is-active", item === button);
      item.setAttribute("aria-selected", String(item === button));
    });

    loginInput.placeholder = rolePlaceholders[button.dataset.role] || rolePlaceholders.staff;
  });
});

passwordToggle?.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  passwordToggle.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
});

loginForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector(".form-note")?.remove();

  const note = document.createElement("p");
  note.className = "form-note";
  note.textContent = "Login successful. Redirecting to dashboard...";
  loginForm.after(note);

  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 900);
});
