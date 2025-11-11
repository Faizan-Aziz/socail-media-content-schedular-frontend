# Social Media Content Scheduler - Backend

[![Node Version](https://img.shields.io/badge/node-v14+-green)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/yourusername/your-repo)

A Node.js backend API for managing social media content scheduling with user authentication and post management.

---

## 📑 Table of Contents
- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Environment Variables Template](#-environment-variables-template)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [Authentication Flow](#-authentication-flow)
- [Database Models](#-database-models)
- [Assumptions & Notes](#-assumptions--notes)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Support](#-support)

---

## 🚀 Features
- User Authentication (Register/Login with JWT)  
- Content Scheduling  
- Social Media Post Management  
- RESTful API Architecture  
- MongoDB Integration  
- JWT-based Security  

---

## 📋 Prerequisites
- Node.js (v14 or higher)  
- MongoDB (local or cloud instance)  
- npm 

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd social-media-content-scheduler-backend

2. Install dependencies
npm install

3. Environment Configuration

Create a .env file in the root directory with the following variables:

# Server Configuration
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/social-media-scheduler

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# Optional: Production Database (if using MongoDB Atlas)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/social-media-scheduler

4. Start the development server
npm run dev


The server will start on http://localhost:5000

🗄️ Environment Variables Template
# Server
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/social-media-scheduler

# JWT
JWT_SECRET=your-jwt-secret-key-change-in-production

# Optional: For production
# NODE_ENV=production

📚 API Documentation
Authentication Endpoints

Register User
POST /api/auth/register

Body:

{
  "username": "user123",
  "email": "user@example.com",
  "password": "password123"
}


Login User
POST /api/auth/login

Body:

{
  "email": "user@example.com",
  "password": "password123"
}

Content Endpoints

Get All Posts
GET /api/content/posts
Headers: Authorization: Bearer <jwt-token>

Create New Post
POST /api/content/posts

Headers: Authorization: Bearer <jwt-token>
Body:

{
  "content": "Post content here",
  "scheduleTime": "2024-01-01T10:00:00.000Z",
  "platform": "twitter"
}


Update Post
PUT /api/content/posts/:id
Headers: Authorization: Bearer <jwt-token>

Delete Post
DELETE /api/content/posts/:id
Headers: Authorization: Bearer <jwt-token>

🏗️ Project Structure
backend/
├── controllers/     # Route controllers
├── models/          # MongoDB models
├── routes/          # API routes
├── middleware/      # Custom middleware (auth, etc.)
├── config/          # Database configuration
├── .env             # Environment variables (gitignored)
├── package.json
└── server.js        # Entry point

🛠️ Available Scripts
npm run dev     # Start development server with nodemon
npm start       # Start production server
npm test        # Run tests (if configured)

🔐 Authentication Flow

User registers / gets JWT token

Include token in request headers: Authorization: Bearer <token>

Protected routes verify token before processing

💾 Database Models

User Model

{
  username: String,
  email: String,
  password: String (hashed),
  createdAt: Date
}


Post Model

{
  content: String,
  scheduleTime: Date,
  platform: String,
  status: String,
  userId: ObjectId,
  createdAt: Date
}

🚨 Assumptions & Notes

Assumptions Made:

MongoDB is running locally on default port 27017

JWT tokens are used for stateless authentication

Passwords are hashed before storage

Frontend will handle token storage and automatic inclusion in headers

All dates are handled in UTC format

Security Notes:

Always use strong JWT secrets in production

Change default MongoDB credentials

Use environment variables for all sensitive data

Consider rate limiting for production deployment

Development Notes:

CORS is configured for frontend communication

Error handling middleware is included

Console logging for development debugging

🌐 Deployment

Render.com Deployment:

Connect your GitHub repository

Set environment variables in Render dashboard

Deploy automatically from main branch

Environment Variables for Production:

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your-production-jwt-secret
NODE_ENV=production

🤝 Contributing

Fork the repository

Create a feature branch

Commit your changes

Push to the branch

Create a Pull Request

📞 Support

For issues and questions, please create an issue in the GitHub repository.
