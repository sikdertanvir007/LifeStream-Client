# 🩸 BloodConnect - Blood Donation Application

**Live Site:** [https://bloodconnect-client.web.app](https://bloodconnect-client.web.app)  
**Admin Credentials:**  
- **Email:** admin@bloodconnect.com  
- **Password:** admin123

---

## 🚀 About the Project

**BloodConnect** is a full-featured blood donation management system built with the MERN Stack (MongoDB, Express.js, React.js, Node.js). The app allows users to register as donors, create and manage donation requests, and connect with blood recipients. Volunteers and Admins have additional privileges including status updates, blog publishing, and user role management.

This project is a **single-page responsive application** (SPA) designed for mobile, tablet, and desktop views.

---

## 🔑 Features

1. 🔐 Role-based access (Admin, Volunteer, Donor) with JWT authentication.
2. 📝 User registration with blood group, district, upazila, and avatar upload using **ImgBB**.
3. ✅ Status-based user control (active/blocked).
4. 📥 Create, view, update, and delete blood donation requests with rich form validations.
5. 🔍 Donor search functionality by blood group, district, and upazila.
6. 📚 Blog content management with rich text editor (**jodit-react**) and publish/unpublish control.
7. 📊 Admin and volunteer dashboards with total users, funds, and donation request analytics.
8. 💰 Funding page with **Stripe** integration for secure payments.
9. 🌐 Public routes for Blogs, Donation Requests, and Search Page.
10. 🧪 Data fetching using **TanStack Query** and all CRUD operations supported with **SweetAlert2**.

---

## 🧪 Technologies Used

- **Frontend:** React.js, React Router DOM, Tailwind CSS, Axios, TanStack Query, SweetAlert2
- **Backend:** Node.js, Express.js, MongoDB, JWT
- **Authentication:** Firebase Auth
- **Payments:** Stripe
- **Image Hosting:** ImgBB API
- **Editor:** Jodit-react (Rich Text Editor)
- **Animation:** Framer Motion (Optional)
- **PDF Export:** html2pdf.js (Optional)

---

## 🧑‍💻 User Roles

### 👤 Donor
- Register/login and view/edit profile
- Create, edit, delete blood donation requests
- Update donation status (inprogress → done/canceled)
- View personal donation history with filtering & pagination

### 🤝 Volunteer
- View all donation requests
- Update status of any donation request
- Create and manage blogs (except delete/publish)

### 🌐 Admin
- Full access to user management (role/status)
- Manage all donation requests and blogs
- View all funds and total donation statistics
- Change blog status (publish/unpublish), delete blog

---

## 🔒 Protected Routes

- `/dashboard` and all subroutes require login
- Role-based route protection using custom hooks and JWT
- Auth state persists on reload via Firebase and secure JWT

---

## 📂 Environment Variables

Place the following in a `.env.local` file (Never push this file to GitHub)

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_IMGBB_API_KEY=your_imgbb_key
VITE_BASE_URL=https://b11a12-server-side-livid.vercel.app
