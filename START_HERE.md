# 🚀 Quick Start Guide - LMS Application

## Prerequisites
- ✅ Node.js installed
- ✅ MongoDB installed (or MongoDB Atlas account)

---

## 🏃‍♂️ 3 Steps to Run

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Start Backend Server
```bash
npm run dev
```
**Keep this terminal running!**

### Step 3: Open Frontend
```bash
# In a NEW terminal window
cd frontend

# Option A: Using Python
python -m http.server 3000

# Option B: Just double-click index.html
```

---

## 🌐 Access Application

Open browser: **http://localhost:3000**

---

## ✅ Test It

1. **Register**: Create account (Student or Teacher)
2. **Login**: Login with your credentials
3. **Dashboard**: View your account info

---

## 📚 Documentation

- **Full Installation Guide**: [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md)
- **Backend API Docs**: [README_BACKEND.md](README_BACKEND.md)

---

## ⚙️ Configuration

Backend uses MongoDB at: `mongodb://localhost:27017/lms_database`

To change, edit: `backend/.env`

---

## 🆘 Troubleshooting

**MongoDB not connecting?**
- Make sure MongoDB is running: `mongod`

**Port already in use?**
- Change PORT in `backend/.env`

**Frontend can't connect?**
- Verify backend runs on port 5000
- Check browser console for errors

---

**That's it! You're ready to go! 🎉**
