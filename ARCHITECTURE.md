# 🏗️ LMS Architecture - Bronze Level

## System Overview

This is a **3-tier architecture** implementing secure user authentication with database persistence.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                         │
│                                                               │
│  ┌──────────────────┐           ┌──────────────────┐        │
│  │  index.html      │           │  dashboard.html  │        │
│  │  (Login/Register)│  ◄─────►  │  (User Dashboard)│        │
│  └──────────────────┘           └──────────────────┘        │
│           │                               │                  │
│           ├───────────────────────────────┤                  │
│           │                               │                  │
│  ┌──────────────────┐           ┌──────────────────┐        │
│  │    app.js        │           │  dashboard.js    │        │
│  │ (Auth Logic)     │           │  (Display Logic) │        │
│  └──────────────────┘           └──────────────────┘        │
│           │                               │                  │
│           └───────────┬───────────────────┘                  │
│                       │                                      │
│              ┌─────────────────┐                             │
│              │   config.js     │                             │
│              │ (API Connector) │                             │
│              └─────────────────┘                             │
│                       │                                      │
└───────────────────────┼──────────────────────────────────────┘
                        │
                        │ HTTP/HTTPS
                        │ JSON API
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                        SERVER LAYER                          │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                    server.js                         │   │
│  │  - Express App                                       │   │
│  │  - CORS Configuration                                │   │
│  │  - MongoDB Connection                                │   │
│  │  - Error Handling                                    │   │
│  └──────────────────────────────────────────────────────┘   │
│                              │                               │
│                              ▼                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              routes/auth.js                          │   │
│  │  - POST /api/auth/register                           │   │
│  │  - POST /api/auth/login                              │   │
│  │  - GET  /api/auth/me                                 │   │
│  └──────────────────────────────────────────────────────┘   │
│                              │                               │
│                              ▼                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │          middleware/auth.js                          │   │
│  │  - JWT Token Verification                            │   │
│  │  - Role-based Authorization                          │   │
│  └──────────────────────────────────────────────────────┘   │
│                              │                               │
│                              ▼                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │            models/User.js                            │   │
│  │  - Schema Definition                                 │   │
│  │  - Password Hashing (bcrypt)                         │   │
│  │  - Validation Rules                                  │   │
│  └──────────────────────────────────────────────────────┘   │
│                              │                               │
└──────────────────────────────┼───────────────────────────────┘
                               │
                               │ Mongoose ODM
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                      DATABASE LAYER                          │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                   MongoDB                            │   │
│  │                                                      │   │
│  │  Collection: users                                   │   │
│  │  ┌────────────────────────────────────────┐         │   │
│  │  │ {                                      │         │   │
│  │  │   _id: ObjectId,                       │         │   │
│  │  │   name: String,                        │         │   │
│  │  │   email: String (unique),              │         │   │
│  │  │   password: String (hashed),           │         │   │
│  │  │   role: "Student" | "Teacher",         │         │   │
│  │  │   createdAt: Date,                     │         │   │
│  │  │   updatedAt: Date                      │         │   │
│  │  │ }                                      │         │   │
│  │  └────────────────────────────────────────┘         │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Request Flow

### 1. User Registration Flow

```
User fills form → Frontend validates → API POST request → 
Backend validates → Hash password → Save to MongoDB → 
Generate JWT token → Return user data + token → 
Store in localStorage → Redirect to dashboard
```

**Detailed Steps:**

1. **User Input** (index.html)
   - User enters: name, email, password, role
   - Client-side validation (app.js)

2. **API Request** (config.js)
   ```javascript
   POST /api/auth/register
   Body: { name, email, password, role }
   ```

3. **Server Processing** (routes/auth.js)
   - Validate input (express-validator)
   - Check if email exists
   - Create user object

4. **Password Security** (models/User.js)
   - Generate salt (10 rounds)
   - Hash password with bcrypt
   - Store hashed password

5. **Database Storage** (MongoDB)
   - Save user document
   - Auto-generate _id, createdAt, updatedAt

6. **Token Generation** (routes/auth.js)
   - Create JWT payload: { id, email, role }
   - Sign with JWT_SECRET
   - Set expiration (7 days)

7. **Response**
   ```json
   {
     "success": true,
     "data": {
       "user": { id, name, email, role },
       "token": "eyJhbGci..."
     }
   }
   ```

8. **Client Storage** (config.js)
   - Save token to localStorage
   - Save user data to localStorage
   - Redirect to dashboard

---

### 2. User Login Flow

```
User enters credentials → Frontend validates → API POST request → 
Backend finds user → Compare passwords → Generate JWT → 
Return user data + token → Store in localStorage → Redirect
```

**Detailed Steps:**

1. **User Input** (index.html)
   - User enters: email, password
   - Client-side validation

2. **API Request**
   ```javascript
   POST /api/auth/login
   Body: { email, password }
   ```

3. **Server Processing** (routes/auth.js)
   - Validate input
   - Find user by email (include password field)
   - User not found → Return 401

4. **Password Verification** (models/User.js)
   - Compare entered password with hashed password
   - bcrypt.compare(password, hashedPassword)
   - Invalid → Return 401

5. **Token Generation**
   - Create JWT with user data
   - Sign and set expiration

6. **Response**
   - Return user data + token

7. **Client Storage & Redirect**
   - Save to localStorage
   - Redirect to dashboard

---

### 3. Protected Route Access Flow

```
User requests protected data → Include JWT in header → 
Middleware verifies token → Decode payload → Find user → 
Attach to request → Continue to route handler
```

**Detailed Steps:**

1. **API Request** (dashboard.js)
   ```javascript
   GET /api/auth/me
   Headers: { Authorization: "Bearer <token>" }
   ```

2. **Middleware** (middleware/auth.js)
   - Extract token from header
   - Verify token with JWT_SECRET
   - Invalid/expired → Return 401
   - Decode payload to get user ID

3. **User Lookup**
   - Find user by ID from token
   - User not found → Return 401
   - Attach user to req.user

4. **Route Handler** (routes/auth.js)
   - Access req.user
   - Return user data

5. **Response**
   ```json
   {
     "success": true,
     "data": {
       "user": { id, name, email, role }
     }
   }
   ```

---

## Security Layers

### 1. Password Security
```
Plain Password → bcrypt.genSalt(10) → bcrypt.hash() → 
Hashed Password (60 chars) → Stored in DB

Example:
"password123" → "$2a$10$N9qo8uLOickgx2ZMRZoMye..."
```

### 2. JWT Authentication
```
User Data → jwt.sign(payload, secret, {expiresIn}) → 
Token (3 parts: header.payload.signature) → 
Sent to client → Stored in localStorage → 
Sent in Authorization header → jwt.verify() → Decoded payload
```

**Token Structure:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.    ← Header
eyJpZCI6IjY0ZjVhM2IyYzEyMzQ1Njc4OTBh.    ← Payload (user data)
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c    ← Signature
```

### 3. Input Validation
```
Client-side (JavaScript) → Server-side (express-validator) → 
Database Schema Validation (Mongoose)
```

**Validation Layers:**
- **Frontend**: Immediate feedback, UX improvement
- **Backend**: Security, cannot be bypassed
- **Database**: Data integrity, final check

---

## Technology Stack Details

### Frontend
- **HTML5**: Structure and forms
- **CSS3**: Styling with animations
- **JavaScript (ES6+)**: Logic and API calls
- **Fetch API**: HTTP requests
- **LocalStorage**: Client-side data persistence

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
  - Routing
  - Middleware
  - JSON parsing
  - Error handling
- **Mongoose**: MongoDB ODM
  - Schema definition
  - Validation
  - Middleware (pre-save hooks)
  - Query helpers

### Security
- **bcryptjs**: Password hashing
  - Salt rounds: 10
  - One-way hashing
  - Rainbow table resistant
- **jsonwebtoken**: Token generation
  - HS256 algorithm
  - Payload encryption
  - Expiration handling
- **express-validator**: Input validation
  - Sanitization
  - Custom validators
  - Error formatting

### Database
- **MongoDB**: NoSQL database
  - Document-oriented
  - JSON-like documents (BSON)
  - Flexible schema
  - Indexing (email unique)
  - Automatic _id generation

---

## Data Flow Patterns

### Registration Data Flow
```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  Client  │────▶│  Server  │────▶│   Model  │────▶│    DB    │
└──────────┘     └──────────┘     └──────────┘     └──────────┘
   (Form)         (Validate)       (Hash pwd)      (Save doc)
     │                │                 │               │
     └────────────────┴─────────────────┴───────────────┘
                      Response flow ◀──────────────────
```

### Authentication Data Flow
```
┌──────────┐     ┌──────────┐     ┌──────────┐
│  Client  │────▶│  Server  │────▶│    DB    │
└──────────┘     └──────────┘     └──────────┘
  (Creds)       (Verify pwd)      (Find user)
     │               │                  │
     └───────────────┴──────────────────┘
         JWT Token ◀────────────────────
```

---

## File Responsibilities

### Backend Files

| File | Responsibility | Key Functions |
|------|---------------|---------------|
| `server.js` | Application entry point | - Start server<br>- Connect to MongoDB<br>- Configure middleware<br>- Mount routes |
| `models/User.js` | User data model | - Define schema<br>- Hash passwords<br>- Compare passwords<br>- Validation |
| `routes/auth.js` | Authentication endpoints | - Register route<br>- Login route<br>- Get user route |
| `middleware/auth.js` | Security middleware | - Verify JWT<br>- Extract user<br>- Role authorization |
| `.env` | Configuration | - Port<br>- MongoDB URI<br>- JWT secret<br>- Environment |

### Frontend Files

| File | Responsibility | Key Functions |
|------|---------------|---------------|
| `index.html` | Login/Register UI | - Form structure<br>- Input fields |
| `dashboard.html` | User dashboard | - Display user info<br>- Feature showcase |
| `app.js` | Authentication logic | - Handle registration<br>- Handle login<br>- Form validation |
| `dashboard.js` | Dashboard logic | - Load user data<br>- Display info<br>- Logout |
| `config.js` | API configuration | - API helper functions<br>- Token management<br>- HTTP requests |
| `style.css` | Styling | - Visual design<br>- Animations<br>- Responsiveness |

---

## Environment Variables Explained

```env
PORT=5000
# The port where the Express server will listen

NODE_ENV=development
# Environment mode (development/production)
# Affects error messages and logging

MONGODB_URI=mongodb://localhost:27017/lms_database
# MongoDB connection string
# Format: mongodb://[host]:[port]/[database]

JWT_SECRET=your_super_secret_jwt_key
# Secret key for signing JWT tokens
# MUST be changed in production
# Use long, random string

JWT_EXPIRE=7d
# Token expiration time
# Formats: 60s, 10m, 1h, 7d, 30d

CLIENT_URL=http://localhost:3000
# Frontend URL for CORS configuration
# Allows frontend to make API requests
```

---

## API Response Patterns

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Actual data
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "msg": "Validation error message",
      "param": "field_name"
    }
  ]
}
```

---

## Security Best Practices Implemented

✅ **Password Security**
- Never store plain text passwords
- Use bcrypt with salt rounds
- Password field excluded from queries

✅ **Token Security**
- JWT with expiration
- Token stored client-side only
- Verified on every protected request

✅ **Input Validation**
- Client-side validation (UX)
- Server-side validation (security)
- Database schema validation (integrity)

✅ **CORS Protection**
- Whitelist specific origins
- Prevent unauthorized API access

✅ **Error Handling**
- Generic error messages to users
- Detailed logs for developers
- No sensitive data in errors

---

## Scalability Considerations

### Current Implementation (Bronze Level)
- Single server instance
- Direct MongoDB connection
- LocalStorage for client state

### Future Enhancements (Silver/Gold/Platinum)
- Load balancing
- Redis for session management
- Database replication
- Microservices architecture
- WebSocket for real-time features
- CDN for static assets
- Rate limiting
- API versioning

---

## Database Schema Evolution

### Bronze Level (Current)
```javascript
User {
  name: String
  email: String (unique)
  password: String (hashed)
  role: String (enum)
  createdAt: Date
  updatedAt: Date
}
```

### Future Schemas (Silver/Gold/Platinum)
```javascript
Course {
  title, description, duration
  teacherId: ref(User)
  enrollments: [ref(Enrollment)]
}

Enrollment {
  studentId: ref(User)
  courseId: ref(Course)
  enrolledAt: Date
}

Assignment {
  courseId: ref(Course)
  title, description, dueDate
}

Submission {
  assignmentId: ref(Assignment)
  studentId: ref(User)
  content, grade, feedback
}
```

---

**This architecture provides a solid foundation for building a complete LMS with secure authentication! 🚀**
