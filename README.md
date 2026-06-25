# 🚀 ScholarFlow Backend

<div align="center">

# ScholarFlow – AI Powered Learning Management System (Backend)

A production-ready backend for an AI-powered Learning Management System (LMS) built using **Next.js**, **TypeScript**, **Prisma ORM**, **Neon PostgreSQL**, and **Google Gemini AI**.

It provides secure authentication, role-based authorization, course management, lesson management, enrollment workflows, analytics, AI-powered question answering, and REST APIs for the ScholarFlow frontend.

---

## 🌐 Live Links

### 🖥️ Frontend (Live)

https://scholarflow-frontend-phi.vercel.app/

### ⚙️ Backend API

https://scholarflow-backend.vercel.app/

---

## 📂 Related Repository

### Frontend Repository

https://github.com/xKakshil/scholarflow-frontend

---

</div>

# 📖 Project Overview

ScholarFlow is a modern AI-powered Learning Management System designed to provide a complete online learning experience.

The backend is responsible for:

- User Authentication
- Authorization
- Course Management
- Lesson Management
- Student Enrollment
- Instructor Analytics
- Admin Dashboard
- Revenue Statistics
- AI Tutor Integration
- Database Management

The backend exposes REST APIs that are consumed by the Next.js frontend.

---

# ✨ Features

## 🔐 Authentication

- User Registration
- Secure Login
- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
- Token Verification

---

## 👥 Role Based Access Control

Three user roles are supported.

### Admin

- View all users
- View all courses
- View enrollments
- Platform analytics
- Revenue dashboard

---

### Instructor

- Create Courses
- View Courses
- Create Lessons
- View Students
- Instructor Analytics

---

### Student

- Browse Courses
- Enroll in Courses
- View Purchased Courses
- Access Lessons
- AI Learning Assistant

---

# 🤖 AI Learning Assistant

ScholarFlow integrates Google Gemini AI.

The AI Assistant:

- Searches available course notes
- Uses relevant course content as context
- Generates educational answers
- Falls back to general knowledge when required
- Returns referenced course material

The AI is powered by

- Google Gemini 2.5 Flash Lite
- Prisma
- PostgreSQL
- Retrieval-based Context Injection

---

# 🛠 Tech Stack

## Framework

- Next.js 16

## Language

- TypeScript

## ORM

- Prisma

## Database

- Neon PostgreSQL

## Authentication

- JWT
- bcrypt

## AI

- Google Gemini API

## API

- REST APIs

## Deployment

- Vercel

---

# 🏗 Architecture

```
                Frontend (Next.js)

                        │

                        │ REST API

                        ▼

             ScholarFlow Backend

                        │

        ┌───────────────┼───────────────┐

        │               │               │

 Authentication     Course APIs      AI APIs

        │               │               │

        └───────────────┼───────────────┘

                        │

                     Prisma ORM

                        │

                 Neon PostgreSQL
```

---

# 📂 Project Structure

```
scholarflow-backend

│

├── prisma

│   ├── schema.prisma

│   └── migrations

│

├── src

│   ├── app

│   │

│   ├── api

│   │

│   ├── lib

│   │

│   ├── middleware

│   │

│   └── validations

│

├── package.json

├── tsconfig.json

└── README.md
```

---

# 🗄 Database

The application uses PostgreSQL hosted on Neon.

Major database models include:

- User
- Course
- Lesson
- Enrollment
- ContentChunk

Relationships

```
User

├── Courses

├── Lessons

└── Enrollments

Course

├── Lessons

└── Enrollments

Lesson

└── Course

Enrollment

├── User

└── Course

ContentChunk

└── AI Knowledge Base
```

---

# 🔒 Authentication Flow

1. User registers.

2. Password is hashed using bcrypt.

3. User logs in.

4. Backend generates JWT.

5. Token is stored by frontend.

6. Protected APIs validate JWT.

7. User permissions are checked.

8. Requested resource is returned.

---

# 📚 API Endpoints

## Authentication

POST

```
/api/auth/register
```

Register a new user.

---

POST

```
/api/auth/login
```

Authenticate existing users.

---

## Student APIs

GET

```
/api/student/courses
```

Browse available courses.

---

GET

```
/api/student/my-courses
```

View enrolled courses.

---

POST

```
/api/enrollments
```

Enroll in a course.

---

GET

```
/api/student/learn/:id
```

Access course lessons.

---

## Instructor APIs

GET

```
/api/instructor/courses
```

Instructor courses.

---

POST

```
/api/instructor/courses
```

Create course.

---

POST

```
/api/instructor/lessons
```

Create lesson.

---

GET

```
/api/instructor/students
```

View enrolled students.

---

GET

```
/api/instructor/analytics
```

Instructor analytics.

---

## Admin APIs

GET

```
/api/admin/users
```

View platform users.

---

GET

```
/api/admin/courses
```

View all courses.

---

GET

```
/api/admin/enrollments
```

Enrollment statistics.

---

GET

```
/api/admin/revenue
```

Revenue dashboard.

---

GET

```
/api/admin/stats
```

Platform statistics.

---

## AI

POST

```
/api/ai/ask
```

Accepts a student's question and returns an AI-generated educational response using course content and Google Gemini AI.

---

# 🔑 Environment Variables

Create a `.env` file inside the project root.

```env
DATABASE_URL=your_neon_postgresql_connection_string

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_google_gemini_api_key
```

---

# ⚙️ Installation

## 1 Clone Repository

```bash
git clone https://github.com/xKakshil/scholarflow-backend.git
```

---

## 2 Navigate

```bash
cd scholarflow-backend
```

---

## 3 Install Dependencies

```bash
npm install
```

---

## 4 Generate Prisma Client

```bash
npx prisma generate
```

---

## 5 Run Database Migration

```bash
npx prisma migrate dev
```

---

## 6 Start Development Server

```bash
npm run dev
```

Backend starts on

```
http://localhost:3000
```

---

# 🚀 Deployment

The backend is deployed on **Vercel**.

Deployment Stack

- Vercel
- Neon PostgreSQL
- Prisma ORM
- Google Gemini API

Production URL

```
https://scholarflow-backend.vercel.app
```

---

# 🔄 Request Flow

```
Client

↓

Frontend

↓

REST API

↓

JWT Authentication

↓

Authorization

↓

Business Logic

↓

Prisma ORM

↓

Neon PostgreSQL

↓

JSON Response
```

---

# 🤖 AI Workflow

```
Student asks question

↓

Backend receives request

↓

Relevant course notes retrieved

↓

Prompt created

↓

Gemini AI called

↓

AI Response Generated

↓

Response returned to frontend
```

---

# 🛡 Security Features

The backend implements multiple security mechanisms.

### Authentication

- JWT Authentication
- Password Hashing using bcrypt

### Authorization

- Role Based Access Control
- Protected APIs
- Middleware Authentication

### Validation

- Request Validation
- Invalid Token Handling
- Error Handling

---

# ⚡ Performance Optimizations

- Prisma ORM
- Optimized SQL Queries
- Serverless Deployment
- Lightweight REST APIs
- Context-aware AI Prompting
- Efficient Database Relationships

---

# 🧪 Testing

The backend has been manually tested for:

- User Registration
- Login
- JWT Authentication
- Role Authorization
- Course Creation
- Lesson Creation
- Student Enrollment
- AI Question Answering
- Instructor Analytics
- Revenue Dashboard
- Admin Dashboard

---

# ⚠ Known Limitations

Since this project is deployed using free cloud services:

- Initial requests may take 20–60 seconds after inactivity.
- Gemini Free API has usage limits.
- Neon PostgreSQL may take a few seconds to wake up.
- AI response time depends on Gemini API availability.

These delays disappear after the services become active.

---

# 🔮 Future Improvements

The following enhancements are planned for future versions:

- Semantic Search using Vector Embeddings
- AI Response Streaming
- Course File Uploads
- Video Lecture Support
- Assignment Submission Portal
- Quiz Management
- Certificate Generation
- Email Verification
- Password Reset
- Payment Gateway Integration
- Real-time Notifications
- Docker Support
- CI/CD Pipeline
- Unit Testing
- Integration Testing
- AI Response Caching
- Multi-language Support

---

# 👨‍💻 Author

**Kakshil Kumar**

B.Tech Electronics Engineering

Indian Institute of Technology (BHU), Varanasi

GitHub

https://github.com/xKakshil

LinkedIn

https://www.linkedin.com/in/kakshil/

---

# 📄 License

This project has been developed for educational and portfolio purposes.

Feel free to explore the codebase and use it as a learning resource.

---

# ⭐ Acknowledgements

Special thanks to the following technologies that made ScholarFlow possible.

- Next.js
- React
- TypeScript
- Prisma ORM
- Neon PostgreSQL
- Google Gemini AI
- Vercel
- JWT
- bcrypt

---

<div align="center">

## ⭐ If you found this project useful, consider giving it a star!

### ScholarFlow Backend

AI Powered Learning Management System

Built with ❤️ by Kakshil Kumar

</div>
