# EmployWise - a User Management Dashboard

[![Vercel Deployment](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)](https://employwise-nu.vercel.app/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![Material UI](https://img.shields.io/badge/Material_UI-5-purple?logo=mui)](https://mui.com/)

A responsive user management system with authentication and CRUD operations, built with React and Material UI.

## Live Demo
👉 [https://employwise-nu.vercel.app/](https://employwise-nu.vercel.app/)

## Features
- 🔒 Token-based authentication
- 📄 Paginated user listing
- ✏️ Edit user profiles
- 🗑️ Delete users with confirmation
- 🔍 Client-side search
- 📱 Fully responsive design
- 🚦 Form validation
- 💬 Toast notifications

## Tech Stack
- **Frontend**: React 18, TypeScript
- **UI Framework**: Material UI 5
- **Routing**: React Router 6
- **HTTP Client**: Axios
- **Form Handling**: Formik + Yup
- **Deployment**: Vercel

## Installation
```bash
git clone https://github.com/your-username/EmployWise.git
cd EmployWise
npm install
npm run dev
```

## Configuration
Create `.env` file:
```env
VITE_API_BASE=https://reqres.in/api
```

## Deployment
Automatically deployed via Vercel on push to `main` branch.

## API Endpoints Used
| Feature       | Endpoint               | Method |
|--------------|------------------------|--------|
| Login        | `/api/login`           | POST   |
| List Users   | `/api/users?page={page}` | GET    |
| Update User  | `/api/users/{id}`      | PUT    |
| Delete User  | `/api/users/{id}`      | DELETE |
