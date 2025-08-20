// Show/hide password
document.getElementById("toggleBtn").addEventListener("click", function () {
  const pass = document.getElementById("loginPassword");
  if (pass.type === "password") {
    pass.type = "text";
    this.textContent = "Hide";
  } else {
    pass.type = "password";
    this.textContent = "Show";
  }
});

// Password strength checker
function checkStrength(inputId, msgId) {
  const input = document.getElementById(inputId);
  const msg = document.getElementById(msgId);

  input.addEventListener("input", function () {
    const val = this.value;
    let strength = "Weak";
    let color = "red";

    if (val.length > 6 && /[A-Z]/.test(val) && /[0-9]/.test(val) && /[^A-Za-z0-9]/.test(val)) {
      strength = "Strong";
      color = "green";
    } else if (val.length > 4 && (/[A-Z]/.test(val) || /[0-9]/.test(val))) {
      strength = "Medium";
      color = "orange";
    }

    msg.textContent = val ? strength : "";
    msg.style.color = color;
  });
}
checkStrength("loginPassword", "loginStrength");
checkStrength("signupPassword", "signupStrength");

// Switch forms
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

document.getElementById("showSignup").addEventListener("click", () => {
  loginForm.classList.remove("active");
  signupForm.classList.add("active");
});

document.getElementById("showLogin").addEventListener("click", () => {
  signupForm.classList.remove("active");
  loginForm.classList.add("active");
});

// Handle Sign Up
document.getElementById("signupBtn").addEventListener("click", () => {
  const username = document.getElementById("signupUsername").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const confirm = document.getElementById("signupConfirm").value.trim();
  const error = document.getElementById("signupError");
  const success = document.getElementById("signupSuccess");

  if (!username || !email || !password || password !== confirm) {
    error.style.display = "block";
    success.style.display = "none";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.find(u => u.username === username)) {
    error.textContent = "Username already exists";
    error.style.display = "block";
    success.style.display = "none";
    return;
  }

  users.push({ username, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  error.style.display = "none";
  success.style.display = "block";
  signupForm.reset();
});

// Handle Login
document.getElementById("loginBtn").addEventListener("click", () => {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const remember = document.getElementById("rememberMe").checked;
  const error = document.getElementById("loginError");
  const success = document.getElementById("loginSuccess");

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    error.style.display = "block";
    success.style.display = "none";
  } else {
    error.style.display = "none";
    success.style.display = "block";

    if (remember) {
      localStorage.setItem("rememberedUser", username);
    } else {
      localStorage.removeItem("rememberedUser");
    }
  }
});

// Forgot Password
document.getElementById("forgotPassword").addEventListener("click", (e) => {
  e.preventDefault();
  const user = document.getElementById("loginUsername").value.trim();
  if (!user) {
    alert("Please enter your username or email first.");
  } else {
    alert("Password reset link sent to " + user + " (simulation).");
  }
});

// Auto-fill remembered username
window.onload = () => {
  const savedUser = localStorage.getItem("rememberedUser");
  if (savedUser) {
    document.getElementById("loginUsername").value = savedUser;
    document.getElementById("rememberMe").checked = true;
  }
};
