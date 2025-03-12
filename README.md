# To-Do List Project

## Overview
To-Do List is a full-stack task management application that allows users to create, manage, and organize their tasks efficiently. The project consists of a **React TypeScript frontend** and an **Express TypeScript backend**.

## Features
- User authentication (Sign up, Sign in, Sign out)
- Task management (Create, Edit, Delete, Complete tasks)
- Responsive UI for seamless user experience
- Secure API with JWT authentication , CSRF

---

## Tech Stack
### Frontend (React TypeScript)
- React with TypeScript
- Vite (for fast development)
- React Router (for navigation)
- Fetch API (for backend communication)
- CSS Modules / TailwindCSS (for styling)

### Backend (Express TypeScript)
- Express.js with TypeScript
- Node.js
- PostgreSQL (with Prisma ORM for database management)
- JWT (for authentication)
- CSRF
- Bcrypt.js (for password hashing)
- Validator.js (for input validation)

---

## Folder Structure
```
main-branch/
│── to-do-list/          # Frontend (React TypeScript)
│── todo-list-backend/   # Backend (Express TypeScript)
```

---

## Installation & Setup

### 1. Clone the repository

git clone https://github.com/your-username/todo-list.git
cd todo-list
```

### 2. Setup Frontend

cd to-do-list
npm install
npm run dev
```

### 3. Setup Backend

cd ../todo-list-backend
npm install
npm run dev
```


## Environment Variables
Create a `.env` file in the **backend** folder and add:
```
PORT=3000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h
CSRF_COOKIE_NAME=__Host-csrf
```

---

### Author
Developed by Ala'a Abu Ghdaib 🚀

