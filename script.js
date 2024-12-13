// Handle user registration
function registerUser() {
  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.some(user => user.username === username)) {
    document.getElementById("register-error").innerText = "Username already exists.";
    return;
  }

  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registration successful. Please login.");
  switchToLogin();
}

// Handle user login
function loginUser() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.some(user => user.username === username && user.password === password)) {
    localStorage.setItem("currentUser", username);
    alert("Login successful!");
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("login-error").innerText = "Invalid username or password.";
  }
}

// Handle admin logout
function logoutAdmin() {
  localStorage.removeItem("currentAdmin");
  window.location.href = "index.html";
}

// Handle user logout
function logoutUser() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

// Switch between login and register forms
function switchToRegister() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("register-form").style.display = "block";
}

function switchToLogin() {
  document.getElementById("login-form").style.display = "block";
  document.getElementById("register-form").style.display = "none";
}

// Handle contact form submission
function submitContactForm(event) {
  event.preventDefault();
  const name = document.getElementById("contact-name").value;
  const email = document.getElementById("contact-email").value;
  const message = document.getElementById("contact-message").value;
  const contactMessages = JSON.parse(localStorage.getItem("contactMessages")) || [];

  contactMessages.push({ name, email, message });
  localStorage.setItem("contactMessages", JSON.stringify(contactMessages));
  alert("Message sent successfully!");
  document.getElementById("contact-form").reset();
}

// Fetch users and contact messages for admin panel
function loadAdminData() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const contactMessages = JSON.parse(localStorage.getItem("contactMessages")) || [];

  const usersList = document.getElementById("users-list");
  usersList.innerHTML = users.map(user => `<tr><td>${user.username}</td><td>-</td></tr>`).join("");

  const messagesList = document.getElementById("contact-messages-list");
  messagesList.innerHTML = contactMessages.map(msg => `
    <tr>
      <td>${msg.name}</td>
      <td>${msg.email}</td>
      <td>${msg.message}</td>
    </tr>
  `).join("");
}
