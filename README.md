# LMS Backend - Bronze Level

## Quick Start

```bash
# Install dependencies
npm install

# Start server
npm run dev
```

Server will run on: http://localhost:5000

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth token)

## Environment Setup

Create `.env` file with:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/lms_database
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

## Features

✅ User registration with validation
✅ Secure password hashing (bcrypt)
✅ JWT authentication
✅ MongoDB integration
✅ Role-based access (Student/Teacher)

For detailed documentation, see [README_BACKEND.md](../README_BACKEND.md)
