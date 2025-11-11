# Social Media Content Scheduler - Backend

A Node.js backend API for managing social media content scheduling with user authentication and post management.

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
- npm or yarn

---

## ⚙️ Installation & Setup

### 1. Clone the repository

git clone <your-repository-url>
cd social-media-content-scheduler-backend



### 2. Install Dependencies

npm install



### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/social-media-scheduler

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# Optional: Production Database (if using MongoDB Atlas)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/social-media-scheduler

---

### 4. Start the Development Server

```bash
npm run dev


### 🗄️ Environment Variables Template

```env
# Server
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/social-media-scheduler

# JWT
JWT_SECRET=your-jwt-secret-key-change-in-production

# Optional: For production
# NODE_ENV=production


### 📚 API Documentation

#### Authentication Endpoints

**Register User**  
`POST /api/auth/register`  

**Request Body:**
```json
{
  "username": "user123",
  "email": "user@example.com",
  "password": "password123"
}

**Login User**  
`POST /api/auth/login`  

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}


#### Content Endpoints

**Get All Posts**  
`GET /api/content/posts`  
**Headers:** `Authorization: Bearer <jwt-token>`

**Create New Post**  
`POST /api/content/posts`  
**Headers:** `Authorization: Bearer <jwt-token>`  

**Request Body:**
```json
{
  "content": "Post content here",
  "scheduleTime": "2024-01-01T10:00:00.000Z",
  "platform": "twitter"
}


**Update Post**  
`PUT /api/content/posts/:id`  
**Headers:** `Authorization: Bearer <jwt-token>`

**Delete Post**  
`DELETE /api/content/posts/:id`  
**Headers:** `Authorization: Bearer <jwt-token>`


### 🏗️ Project Structure
backend/
├── controllers/ # Route controllers
├── models/ # MongoDB models
├── routes/ # API routes
├── middleware/ # Custom middleware (auth, etc.)
├── config/ # Database configuration
├── .env # Environment variables (gitignored)
├── package.json
└── server.js # Entry point

### 🛠️ Available Scripts

```bash
npm run dev     # Start development server with nodemon
npm start       # Start production server
npm test        # Run tests (if configured)

### 🔐 Authentication Flow

1. User registers / gets JWT token
2. Include token in request headers: `Authorization: Bearer <token>`
3. Protected routes verify token before processing


### 💾 Database Models

#### User Model
```javascript
{
  username: String,
  email: String,
  password: String, // hashed
  createdAt: Date
}


#### Post Model
```javascript
{
  content: String,
  scheduleTime: Date,
  platform: String,
  status: String,
  userId: ObjectId,
  createdAt: Date
}


### 🚨 Assumptions & Notes

#### Assumptions Made
- MongoDB is running locally on default port 27017
- JWT tokens are used for stateless authentication
- Passwords are hashed before storage
- Frontend will handle token storage and automatic inclusion in headers
- All dates are handled in UTC format

#### Security Notes
- Always use strong JWT secrets in production
- Change default MongoDB credentials
- Use environment variables for all sensitive data
- Consider rate limiting for production deployment

#### Development Notes
- CORS is configured for frontend communication
- Error handling middleware is included
- Console logging for development debugging


### 🌐 Deployment

#### Render.com Deployment
1. Connect your GitHub repository
2. Set environment variables in the Render dashboard
3. Deploy automatically from the main branch

#### Environment Variables for Production
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your-production-jwt-secret
NODE_ENV=production


#### Environment Variables for Production
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your-production-jwt-secret


### 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

### 📞 Support
For issues and questions, please create an issue in the GitHub repository.


