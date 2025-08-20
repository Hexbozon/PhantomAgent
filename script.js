// Show/hide password for login form
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

document.getElementById("loginBtn").addEventListener("click", function () {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("error-msg");

  if (user === "" || pass === "") {
    errorMsg.style.display = "block";
  } else {
    errorMsg.style.display = "none";
    alert("Login successful! (Frontend only)");
  }
});
// Toggle between forms
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

  if (!username || !email || !password || password !== confirm) {
    error.style.display = "block";
    return;
  }

  // Save to localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.find(u => u.username === username)) {
    error.textContent = "Username already exists";
    error.style.display = "block";
    return;
  }

  users.push({ username, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Sign Up Successful! You can now log in.");
  signupForm.classList.remove("active");
  loginForm.classList.add("active");
});

// Handle Sign In
document.getElementById("loginBtn").addEventListener("click", () => {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const error = document.getElementById("loginError");

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    error.style.display = "block";
  } else {
    error.style.display = "none";
    alert("Login Successful! Welcome " + username);
    // redirect to another page if you want:
    // window.location.href = "dashboard.html";
  }
});