USE hospital_db;

INSERT INTO users (name, email, password, role, createdAt, updatedAt)
VALUES
  ('Admin User', 'admin@example.com', '$2b$10$wY3Yjc0w1PjS8/KoTDuQNe7UJ4iTmzYqNnHP8UY4Jx7I3PeP4xA.W', 'admin', NOW(), NOW()),
  ('Reception User', 'reception@example.com', '$2b$10$wY3Yjc0w1PjS8/KoTDuQNe7UJ4iTmzYqNnHP8UY4Jx7I3PeP4xA.W', 'receptionist', NOW(), NOW()),
  ('Doctor User', 'doctor@example.com', '$2b$10$Fk64wA1CZqDxCcSRLiD/newdSa1RkqwT5dRGyw7u95CqoyxQ77x52', 'doctor', NOW(), NOW()),
  ('Patient User', 'patient@example.com', '$2b$10$BfD6sUzzOV5j.w3EGX4P9OyCJbEXf0VTWo52Bk92Vy57CRRxAn5rO', 'patient', NOW(), NOW());

INSERT INTO patients (fullname, gender, dob, phone, address, blood_group, emergency_contact, createdAt, updatedAt)
VALUES
  ('John Doe', 'Male', '1990-05-14', '555-0100', '123 Main St', 'O+', 'Jane Doe - 555-0101', NOW(), NOW()),
  ('Maria Lopez', 'Female', '1985-08-22', '555-0102', '456 Oak Ave', 'A-', 'Carlos Lopez - 555-0103', NOW(), NOW()),
  ('Samuel Kim', 'Male', '1978-12-05', '555-0104', '789 Pine Rd', 'B+', 'Anna Kim - 555-0105', NOW(), NOW());

INSERT INTO doctors (fullname, specialization, phone, email, department, createdAt, updatedAt)
VALUES
  ('Dr. Emily Clark', 'Cardiology', '555-0200', 'emily.clark@example.com', 'Cardiology', NOW(), NOW()),
  ('Dr. Michael Patel', 'Neurology', '555-0202', 'michael.patel@example.com', 'Neurology', NOW(), NOW()),
  ('Dr. Sofia Rahman', 'Pediatrics', '555-0204', 'sofia.rahman@example.com', 'Pediatrics', NOW(), NOW());

INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, status, createdAt, updatedAt)
VALUES
  (1, 1, '2026-07-10', '09:30:00', 'scheduled', NOW(), NOW()),
  (2, 2, '2026-07-11', '11:00:00', 'scheduled', NOW(), NOW()),
  (3, 3, '2026-07-12', '14:15:00', 'completed', NOW(), NOW());

INSERT INTO medical_records (patient_id, doctor_id, diagnosis, prescription, notes, record_date, createdAt, updatedAt)
VALUES
  (1, 1, 'Hypertension', 'Lisinopril 10mg once daily', 'Monitor blood pressure weekly.', '2026-07-10', NOW(), NOW()),
  (2, 2, 'Migraine', 'Sumatriptan 50mg as needed', 'Avoid bright lights and stress.', '2026-07-11', NOW(), NOW()),
  (3, 3, 'Seasonal Allergy', 'Cetirizine 10mg daily', 'Use nasal spray if needed.', '2026-07-12', NOW(), NOW());

INSERT INTO bills (patient_id, consultation_fee, medication_fee, laboratory_fee, total_amount, payment_status, createdAt, updatedAt)
VALUES
  (1, 120.00, 45.00, 30.00, 195.00, 'pending', NOW(), NOW()),
  (2, 150.00, 30.00, 50.00, 230.00, 'partial', NOW(), NOW()),
  (3, 100.00, 20.00, 0.00, 120.00, 'paid', NOW(), NOW());
