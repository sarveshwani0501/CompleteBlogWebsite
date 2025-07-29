# 📝 BlogSpace

> A full-stack blogging platform built with React, Node.js, and modern web technologies

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/react-%5E18.0.0-blue)](https://reactjs.org/)

## ✨ Features

- **🎨 Modern UI/UX** - Clean, responsive design with dark/light mode support
- **📝 Rich Text Editor** - Markdown-based content creation with live preview
- **🏷️ Smart Tagging System** - Intelligent tag suggestions and management
- **👤 User Authentication** - Secure user registration and login system
- **📱 Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **🔍 Search & Filter** - Advanced blog discovery and filtering capabilities
- **💾 Draft Management** - Save and manage blog drafts
- **🖼️ Image Upload** - Cover image support for blog posts
- **⚡ Fast Performance** - Built with Vite for lightning-fast development and builds

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/blog-platform.git
   cd blog-platform
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**

   Create `.env` files in both frontend and backend directories:

   **Backend `.env`:**

   ```env
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/blog-platform
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:5173
   ```

   **Frontend `.env`:**

   ```env
   VITE_API_URL=http://localhost:8000/api
   VITE_APP_NAME=Blog Platform
   ```

5. **Start the development servers**

   **Backend:**

   ```bash
   cd backend
   npm run dev
   ```

   **Frontend:**

   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000

## 📁 Project Structure

```
blog-platform/
│
├── 📂 backend/                 # Node.js/Express API server
│   ├── 📂 controllers/         # Request handlers and business logic
│   │   ├── authController.js   # Authentication related logic
│   │   ├── blogController.js   # Blog CRUD operations
│   │   └── userController.js   # User management
│   │
│   ├── 📂 middlewares/         # Express middlewares
│   │   ├── auth.js            # Authentication middleware
│   │   ├── upload.js          # File upload handling
│   │   └── validation.js      # Request validation
│   │
│   ├── 📂 routes/             # API route definitions
│   │   ├── auth.js            # Authentication routes
│   │   ├── blogs.js           # Blog-related routes
│   │   └── users.js           # User-related routes
│   │
│   ├── 📂 utils/              # Utility functions and helpers
│   │   ├── database.js        # Database connection logic
│   │   ├── helpers.js         # Common helper functions
│   │   └── constants.js       # Application constants
│   │
│   ├── 📂 temp/               # Temporary file storage
│   │
│   ├── 📄 index.js            # Server entry point
│   ├── 📄 package.json        # Backend dependencies
│   └── 📄 .env                # Environment variables
│
├── 📂 frontend/               # React frontend application
│   ├── 📂 public/             # Static assets
│   │
│   ├── 📂 src/                # Source code
│   │   ├── 📂 components/     # Reusable UI components
│   │   │   ├── common/        # Shared components
│   │   │   ├── layout/        # Layout components
│   │   │   └── ui/            # Basic UI elements
│   │   │
│   │   ├── 📂 features/       # Feature-based modules
│   │   │   ├── auth/          # Authentication logic
│   │   │   ├── blog/          # Blog-related features
│   │   │   └── user/          # User management
│   │   │
│   │   ├── 📂 utils/          # Frontend utilities
│   │   │   ├── api.js         # API client configuration
│   │   │   ├── helpers.js     # Helper functions
│   │   │   └── constants.js   # Frontend constants
│   │   │
│   │   ├── 📂 auth/           # Authentication components
│   │   │
│   │   ├── 📄 App.jsx         # Main application component
│   │   ├── 📄 main.jsx        # Application entry point
│   │   └── 📄 index.css       # Global styles
│   │
│   ├── 📄 package.json        # Frontend dependencies
│   ├── 📄 vite.config.js      # Vite configuration
│   └── 📄 .env                # Frontend environment variables
│
├── 📄 README.md               # Project documentation
└── 📄 .gitignore              # Git ignore rules
```

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern React with hooks and concurrent features
- **Vite** - Next-generation frontend tooling
- **Redux Toolkit** - Predictable state container
- **React Router** - Declarative routing
- **Tailwind CSS** - Utility-first CSS framework
- **MDEditor** - Markdown editor with live preview
- **Axios** - Promise-based HTTP client

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Multer** - Middleware for handling multipart/form-data
- **Bcrypt** - Password hashing library

## 📚 API Documentation

### Authentication Endpoints

```
POST   /api/auth/register     # User registration
POST   /api/auth/login        # User login
POST   /api/auth/logout       # User logout
GET    /api/auth/me           # Get current user
```

### Blog Endpoints

```
GET    /api/blogs             # Get all blogs
GET    /api/blogs/:id         # Get blog by ID
GET    /api/blogs/slug/:slug  # Get blog by slug
POST   /api/blogs             # Create new blog
PUT    /api/blogs/:id         # Update blog
DELETE /api/blogs/:id         # Delete blog
```

### User Endpoints

```
GET    /api/users/profile     # Get user profile
PUT    /api/users/profile     # Update user profile
GET    /api/users/:id/blogs   # Get user's blogs
```

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

```bash
cd frontend
npm run build
# Deploy the 'dist' folder
```

### Backend Deployment (Railway/Heroku)

```bash
cd backend
# Set environment variables in your hosting platform
# Deploy the backend folder
```

### Environment Variables for Production

Ensure you update the environment variables for production:

- Database connection strings
- JWT secrets
- CORS origins
- File upload configurations

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
