# ER Diagram

Entities and relationships:

- users: id, name, email, password, role
- patients: patient_id, fullname, gender, dob, phone, address, blood_group, emergency_contact
- doctors: doctor_id, fullname, specialization, phone, email, department
- appointments: appointment_id, patient_id, doctor_id, appointment_date, appointment_time, status
- medical_records: record_id, patient_id, doctor_id, diagnosis, prescription, notes, record_date
- bills: bill_id, patient_id, consultation_fee, medication_fee, laboratory_fee, total_amount, payment_status

Relationships:
- patients 1--* appointments
- doctors 1--* appointments
- patients 1--* medical_records
- doctors 1--* medical_records
- patients 1--* bills
