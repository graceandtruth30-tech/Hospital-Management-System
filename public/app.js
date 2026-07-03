const apiBase = '/api';
const alertEl = document.getElementById('alert');

const showAlert = (message, type='success') => {
  alertEl.textContent = message;
  alertEl.className = `alert alert-${type}`;
  alertEl.classList.remove('d-none');
  setTimeout(() => alertEl.classList.add('d-none'), 4000);
};

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const res = await fetch(`${apiBase}/auth/login`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (res.ok) {
    localStorage.setItem('hms_token', data.token);
    showAlert('Login successful', 'success');
    setTimeout(() => window.location.href = '/dashboard.html', 600);
  } else {
    showAlert(data.message || 'Login failed', 'danger');
  }
});

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const role = document.getElementById('registerRole').value;
  const res = await fetch(`${apiBase}/auth/register`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, role })
  });
  const data = await res.json();
  if (res.ok) {
    showAlert('Registered successfully. Please login.', 'success');
    registerForm.reset();
  } else {
    showAlert(data.message || 'Registration failed', 'danger');
  }
});
