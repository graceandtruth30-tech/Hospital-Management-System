const apiBase = '/api';
const token = localStorage.getItem('hms_token');
const dashboardContent = document.getElementById('dashboardContent');

const fetchJson = async (url) => {
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw await res.json();
  return res.json();
};

const renderList = (title, items) => {
  if (!items.length) return `<div class="alert alert-info">No ${title.toLowerCase()} available.</div>`;
  return `<div class="card shadow-sm"><div class="card-body"><h4>${title}</h4><div class="table-responsive"><table class="table table-sm"><thead><tr>${Object.keys(items[0]).map(key => `<th>${key}</th>`).join('')}</tr></thead><tbody>${items.map(item => `<tr>${Object.values(item).slice(0, 6).map(value => `<td>${value ?? ''}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div></div>`;
};

const showError = (error) => {
  dashboardContent.innerHTML = `<div class="alert alert-danger">${error.message || 'Unable to load data'}</div>`;
};

const loadPatients = async () => {
  try {
    const data = await fetchJson(`${apiBase}/patients`);
    dashboardContent.innerHTML = renderList('Patients', data);
  } catch (err) {
    showError(err);
  }
};

const loadDoctors = async () => {
  try {
    const data = await fetchJson(`${apiBase}/doctors`);
    dashboardContent.innerHTML = renderList('Doctors', data);
  } catch (err) {
    showError(err);
  }
};

const loadAppointments = async () => {
  try {
    const data = await fetchJson(`${apiBase}/appointments`);
    dashboardContent.innerHTML = renderList('Appointments', data);
  } catch (err) {
    showError(err);
  }
};

const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('hms_token');
  window.location.href = '/';
});

document.getElementById('loadPatients').addEventListener('click', loadPatients);
document.getElementById('loadDoctors').addEventListener('click', loadDoctors);
document.getElementById('loadAppointments').addEventListener('click', loadAppointments);

if (!token) {
  window.location.href = '/';
}
