// Toggle password visibility
document.getElementById("toggleBtn").addEventListener("click", function () {
  const pass = document.getElementById("password");
  if (pass.type === "password") {
    pass.type = "text";
    this.textContent = "Hide";
  } else {
    pass.type = "password";
    this.textContent = "Show";
  }
});

// Login button event
document.getElementById("loginBtn").addEventListener("click", function () {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const remember = document.getElementById("rememberMe").checked;
  const errorMsg = document.getElementById("error-msg");
  const successMsg = document.getElementById("success-msg");

  if (user === "" || pass === "") {
    errorMsg.style.display = "block";
    successMsg.style.display = "none";
  } else {
    errorMsg.style.display = "none";
    successMsg.style.display = "block";

    if (remember) {
      localStorage.setItem("username", user);
    } else {
      localStorage.removeItem("username");
    }
  }
});

// Forgot password
document.getElementById("forgotPassword").addEventListener("click", function (e) {
  e.preventDefault();
  const user = document.getElementById("username").value.trim();
  if (user === "") {
    alert("Please enter your username or email before resetting.");
  } else {
    alert("A password reset link has been sent to " + user + " (simulation).");
  }
});

// Auto-fill remembered username
window.onload = function () {
  const savedUser = localStorage.getItem("username");
  if (savedUser) {
    document.getElementById("username").value = savedUser;
    document.getElementById("rememberMe").checked = true;
  }
};
