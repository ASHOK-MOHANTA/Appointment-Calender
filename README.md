# 🗓️ Clinic Appointment Calendar (Frontend Assignment)

A responsive, front-end-only calendar application built with **React** to help **clinic or hospital front desk staff** manage doctor appointments efficiently.

This app includes a mock login system, appointment scheduling features, and mobile/desktop responsive calendar views using only **local state** or **localStorage** — no backend required.

---

## 📌 Features

### 🔐 Mock Login
- Simple login screen with hardcoded credentials:
  - **Email:** `staff@clinic.com`
  - **Password:** `123456`
- On successful login, the user is redirected to the calendar view.
- Logout or session persistence is optional and not required.

---

### 📅 Calendar View

#### 🖥 Desktop View
- Full **month view** similar to Google Calendar.
- Each day displays:
  - **Patient names**
  - **Appointment times**
- Clicking a day opens a form to **add/edit appointments**.

#### 📱 Mobile View
- Displays **one day at a time**.
- Includes a **date picker** to jump to any date.
- Allows vertical scrolling to view other days.

---

### 🧾 Appointments
- Each appointment includes:
  - **Patient** (dropdown select)
  - **Doctor** (dropdown select)
  - **Time** (time picker)
- Uses a **fixed list** of patients and doctors (hardcoded or from static JSON).
- Appointment data is stored using:
  - `localStorage` (persistent across reloads)
  - or React local state

---

### 🧠 Calendar Behavior
- Only the **current month** is displayed.
- Days before the first of the month are left **blank**.
- (Optional) Grey-out non-interactive days from adjacent months.

---

## 🛠️ Tech Stack

- **React** (with functional components and hooks)
- **CSS** / **Tailwind CSS** / **Material UI** (any styling method works)
- **localStorage** for persistent data (no backend)
- Optional calendar libraries like `react-calendar` or `react-big-calendar`

---

## 📁 Folder Structure (Sample)
src/
│
├── components/
│   ├── LoginForm.jsx
│   ├── CalendarView.jsx
│   ├── AppointmentForm.jsx
│
├── data/
│   └── doctorsAndPatients.json
│
├── utils/
│   └── storage.js
│
├── App.jsx
├── index.js / main.jsx
└── index.css

