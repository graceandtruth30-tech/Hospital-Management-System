USE hospital_db;

INSERT INTO users (name, email, password, role, createdAt, updatedAt)
VALUES
  ('Admin User', 'admin@example.com', '$2b$10$wY3Yjc0w1PjS8/KoTDuQNe7UJ4iTmzYqNnHP8UY4Jx7I3PeP4xA.W', 'admin', NOW(), NOW()),
  ('Reception', 'reception@example.com', '$2b$10$wY3Yjc0w1PjS8/KoTDuQNe7UJ4iTmzYqNnHP8UY4Jx7I3PeP4xA.W', 'receptionist', NOW(), NOW());

INSERT INTO patients (fullname, gender, dob, phone, address, blood_group, emergency_contact, createdAt, updatedAt)
VALUES
  ('John Doe', 'Male', '1990-05-14', '555-0100', '123 Main St', 'O+', 'Jane Doe - 555-0101', NOW(), NOW());

INSERT INTO doctors (fullname, specialization, phone, email, department, createdAt, updatedAt)
VALUES
  ('Dr. Emily Clark', 'Cardiology', '555-0200', 'emily.clark@example.com', 'Cardiology', NOW(), NOW());

INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, status, createdAt, updatedAt)
VALUES
  (1, 1, '2026-07-10', '09:30:00', 'scheduled', NOW(), NOW());

INSERT INTO medical_records (patient_id, doctor_id, diagnosis, prescription, notes, record_date, createdAt, updatedAt)
VALUES
  (1, 1, 'Hypertension', 'Lisinopril 10mg once daily', 'Monitor blood pressure weekly.', '2026-07-10', NOW(), NOW());

INSERT INTO bills (patient_id, consultation_fee, medication_fee, laboratory_fee, total_amount, payment_status, createdAt, updatedAt)
VALUES
  (1, 100.00, 45.00, 30.00, 175.00, 'pending', NOW(), NOW());
