const apiBase = '/api';
const token = localStorage.getItem('hms_token');
const logoutBtn = document.getElementById('logoutBtn');
const entityConfig = {
  patients: {
    path: 'patients',
    idKey: 'patient_id',
    fields: [
      { key: 'fullname', label: 'Full Name', type: 'text', selector: '#patientFullname' },
      { key: 'gender', label: 'Gender', type: 'select', selector: '#patientGender' },
      { key: 'dob', label: 'Date of Birth', type: 'date', selector: '#patientDob' },
      { key: 'phone', label: 'Phone', type: 'text', selector: '#patientPhone' },
      { key: 'address', label: 'Address', type: 'textarea', selector: '#patientAddress' },
      { key: 'blood_group', label: 'Blood Group', type: 'text', selector: '#patientBloodGroup' },
      { key: 'emergency_contact', label: 'Emergency Contact', type: 'text', selector: '#patientEmergencyContact' }
    ],
    formId: 'patientForm',
    alertId: 'patientAlert',
    listId: 'patientList',
    idInput: 'patientId'
  },
  doctors: {
    path: 'doctors',
    idKey: 'doctor_id',
    fields: [
      { key: 'fullname', label: 'Full Name', type: 'text', selector: '#doctorFullname' },
      { key: 'specialization', label: 'Specialization', type: 'text', selector: '#doctorSpecialization' },
      { key: 'phone', label: 'Phone', type: 'text', selector: '#doctorPhone' },
      { key: 'email', label: 'Email', type: 'email', selector: '#doctorEmail' },
      { key: 'department', label: 'Department', type: 'text', selector: '#doctorDepartment' }
    ],
    formId: 'doctorForm',
    alertId: 'doctorAlert',
    listId: 'doctorList',
    idInput: 'doctorId'
  },
  appointments: {
    path: 'appointments',
    idKey: 'appointment_id',
    fields: [
      { key: 'patient_id', label: 'Patient ID', type: 'number', selector: '#appointmentPatientId' },
      { key: 'doctor_id', label: 'Doctor ID', type: 'number', selector: '#appointmentDoctorId' },
      { key: 'appointment_date', label: 'Date', type: 'date', selector: '#appointmentDate' },
      { key: 'appointment_time', label: 'Time', type: 'time', selector: '#appointmentTime' },
      { key: 'status', label: 'Status', type: 'select', selector: '#appointmentStatus' }
    ],
    formId: 'appointmentForm',
    alertId: 'appointmentAlert',
    listId: 'appointmentList',
    idInput: 'appointmentId'
  },
  records: {
    path: 'medical-records',
    idKey: 'record_id',
    fields: [
      { key: 'patient_id', label: 'Patient ID', type: 'number', selector: '#recordPatientId' },
      { key: 'doctor_id', label: 'Doctor ID', type: 'number', selector: '#recordDoctorId' },
      { key: 'diagnosis', label: 'Diagnosis', type: 'textarea', selector: '#recordDiagnosis' },
      { key: 'prescription', label: 'Prescription', type: 'textarea', selector: '#recordPrescription' },
      { key: 'notes', label: 'Notes', type: 'textarea', selector: '#recordNotes' },
      { key: 'record_date', label: 'Record Date', type: 'date', selector: '#recordDate' }
    ],
    formId: 'recordForm',
    alertId: 'recordAlert',
    listId: 'recordList',
    idInput: 'recordId'
  },
  bills: {
    path: 'bills',
    idKey: 'bill_id',
    fields: [
      { key: 'patient_id', label: 'Patient ID', type: 'number', selector: '#billPatientId' },
      { key: 'consultation_fee', label: 'Consultation Fee', type: 'number', selector: '#billConsultationFee' },
      { key: 'medication_fee', label: 'Medication Fee', type: 'number', selector: '#billMedicationFee' },
      { key: 'laboratory_fee', label: 'Laboratory Fee', type: 'number', selector: '#billLaboratoryFee' },
      { key: 'payment_status', label: 'Payment Status', type: 'select', selector: '#billPaymentStatus' }
    ],
    formId: 'billForm',
    alertId: 'billAlert',
    listId: 'billList',
    idInput: 'billId'
  }
};

if (!token) {
  window.location.href = '/';
}

const showAlert = (containerId, message, type = 'success') => {
  const container = document.getElementById(containerId);
  container.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">${message}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
};

const fetchJson = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    ...options
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }
  return data;
};

const buildTable = (items, columns, entityKey) => {
  if (!items.length) {
    return '<div class="alert alert-info">No records found.</div>';
  }
  const headers = ['ID', ...columns.map(col => col.label), 'Actions'];
  const rows = items.map(item => {
    const cells = [item[entityConfig[entityKey].idKey], ...columns.map(col => item[col.key] ?? '')];
    const actionButtons = `<button class="btn btn-sm btn-secondary me-2" onclick="window.dashboardEdit('${entityKey}', ${item[entityConfig[entityKey].idKey]})">Edit</button><button class="btn btn-sm btn-danger" onclick="window.dashboardDelete('${entityKey}', ${item[entityConfig[entityKey].idKey]})">Delete</button>`;
    return `<tr>${cells.map(val => `<td>${val}</td>`).join('')}
      <td>${actionButtons}</td>
    </tr>`;
  }).join('');
  return `
    <div class="table-responsive">
      <table class="table table-striped table-hover align-middle">
        <thead><tr>${headers.map(header => `<th>${header}</th>`).join('')}</tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
};

window.dashboardEdit = async (entityKey, id) => {
  const config = entityConfig[entityKey];
  try {
    const data = await fetchJson(`${apiBase}/${config.path}/${id}`);
    document.getElementById(config.idInput).value = id;
    config.fields.forEach(field => {
      const el = document.querySelector(field.selector);
      if (!el) return;
      el.value = data[field.key] ?? '';
    });
    showAlert(config.alertId, `Editing ${entityKey.slice(0, -1)} #${id}`, 'info');
  } catch (err) {
    showAlert(config.alertId, err.message, 'danger');
  }
};

window.dashboardDelete = async (entityKey, id) => {
  const config = entityConfig[entityKey];
  if (!confirm(`Delete ${entityKey.slice(0, -1)} #${id}?`)) return;
  try {
    await fetchJson(`${apiBase}/${config.path}/${id}`, { method: 'DELETE' });
    showAlert(config.alertId, `${entityKey.slice(0, -1)} deleted successfully.`, 'success');
    loadEntity(entityKey);
  } catch (err) {
    showAlert(config.alertId, err.message, 'danger');
  }
};

const resetForm = (entityKey) => {
  const config = entityConfig[entityKey];
  document.getElementById(config.idInput).value = '';
  config.fields.forEach(field => {
    const el = document.querySelector(field.selector);
    if (!el) return;
    if (field.type === 'select') {
      el.selectedIndex = 0;
    } else {
      el.value = '';
    }
  });
};

const loadEntity = async (entityKey) => {
  const config = entityConfig[entityKey];
  try {
    const items = await fetchJson(`${apiBase}/${config.path}`);
    const listHtml = buildTable(items, config.fields, entityKey);
    document.getElementById(config.listId).innerHTML = listHtml;
  } catch (err) {
    document.getElementById(config.listId).innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
  }
};

const submitEntity = async (event, entityKey) => {
  event.preventDefault();
  const config = entityConfig[entityKey];
  const id = document.getElementById(config.idInput).value;
  const payload = {};
  config.fields.forEach(field => {
    const el = document.querySelector(field.selector);
    if (!el) return;
    payload[field.key] = el.value;
  });

  try {
    if (id) {
      await fetchJson(`${apiBase}/${config.path}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
      showAlert(config.alertId, `${entityKey.slice(0, -1)} updated successfully.`, 'success');
    } else {
      await fetchJson(`${apiBase}/${config.path}`, {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      showAlert(config.alertId, `${entityKey.slice(0, -1)} created successfully.`, 'success');
    }
    resetForm(entityKey);
    loadEntity(entityKey);
  } catch (err) {
    showAlert(config.alertId, err.message, 'danger');
  }
};

Object.keys(entityConfig).forEach(entityKey => {
  const config = entityConfig[entityKey];
  const form = document.getElementById(config.formId);
  if (form) {
    form.addEventListener('submit', event => submitEntity(event, entityKey));
  }
});

const tabs = document.querySelectorAll('#entityTabs button[data-bs-toggle="tab"]');
tabs.forEach(tab => {
  tab.addEventListener('shown.bs.tab', event => {
    const target = event.target.getAttribute('data-bs-target').substring(1);
    loadEntity(target);
  });
});

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('hms_token');
  window.location.href = '/';
});

const init = () => {
  Object.keys(entityConfig).forEach(key => loadEntity(key));
};

init();
