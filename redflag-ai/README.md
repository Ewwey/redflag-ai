# 🚩 RedFlag AI

> **AI-Powered Job Scam Detection Web Application using Natural Language Processing (NLP)**

RedFlag AI is a full-stack web application designed to help job seekers identify potentially fraudulent job postings before interacting with scammers. By combining Natural Language Processing (NLP), keyword analysis, and machine learning techniques, the application analyzes job descriptions and generates a **Scam Score** along with a detailed explanation of detected red flags.

---

## 📖 About the Project

Online job scams continue to increase across social media platforms and freelance marketplaces. Many fraudulent job offers use persuasive language that can be difficult to identify manually.

RedFlag AI assists users by:

- 🔍 Analyzing job descriptions using NLP
- 🚩 Detecting suspicious scam-related phrases
- 📊 Generating a Scam Score (0–100)
- 📈 Classifying risk as Safe, Suspicious, or Danger
- 📚 Educating users through a Red Flag Guide
- 💾 Saving scan history for future reference

---

## ✨ Features

### 👤 User Authentication
- User registration
- Secure login/logout
- JWT authentication
- Password hashing
- Protected routes

### 🤖 AI Scam Scanner
- Paste a job description
- NLP-based text analysis
- Scam Score generation
- Risk classification
- Detailed list of detected red flags

### 📜 Scan History
- Automatically saves every scan
- View previous analyses
- Filter by risk level
- Sort by date
- View scan details
- Delete scan history

### 📚 Red Flag Guide
- Common scam phrases
- Explanation of why each phrase is suspicious
- Safe job-hunting tips
- Publicly accessible

### ⚙ Profile Settings
- Update display name
- Change email
- Change password

---

# 🏗 System Architecture

```
React Frontend
        │
        ▼
 FastAPI REST API
        │
        ▼
 NLP Processing Engine
        │
        ▼
 MySQL Database
```

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router
- Tailwind CSS
- Axios
- Vite

## Backend

- Python
- FastAPI
- SQLAlchemy
- Alembic

## AI / NLP

- spaCy
- scikit-learn
- Keyword Matching Engine

## Database

- MySQL

## Authentication

- JWT Tokens
- Passlib (bcrypt)

---

# 📂 Project Structure

```
redflag-ai/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── db/
│   │   ├── models/
│   │   ├── nlp/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── utils/
│   │   └── main.py
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

# ⚙ Installation

## Prerequisites

- Python 3.11+
- Node.js 20+
- MySQL Server
- Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/Ewwey/redflag-ai.git
cd redflag-ai
```

---

## 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment.

Windows

```bash
venv\Scripts\activate
```

macOS/Linux

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Copy the environment file:

```bash
cp .env.example .env
```

Configure your database credentials inside `.env`.

Run the backend server:

```bash
uvicorn app.main:app --reload
```

Backend URL:

```
http://127.0.0.1:8000
```

Swagger Documentation:

```
http://127.0.0.1:8000/docs
```

---

## 3. Frontend Setup

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend URL:

```
http://localhost:5173
```

---

# 🗄 Database Setup

1. Create a MySQL database.

2. Update the `.env` file with your database credentials.

Example:

```env
DATABASE_URL=mysql+pymysql://username:password@localhost/redflag_ai
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

3. Run database migrations or import the provided SQL seed files if available.

---

# 📊 Scam Score Levels

| Score | Risk Level |
|--------|------------|
| 0–30 | 🟢 Safe |
| 31–69 | 🟡 Suspicious |
| 70–100 | 🔴 Danger |

---

# 🔒 Security Features

- JWT Authentication
- Password hashing with bcrypt
- Protected API endpoints
- Input validation
- SQL injection protection
- XSS sanitization

---

# 🚀 Future Improvements

- Deep learning classification models
- OCR support for job advertisements
- PDF and image scam detection
- Company reputation lookup
- Browser extension
- Email scam detection
- Explainable AI recommendations
- Multilingual scam detection

---

# 👥 Development Team

| Member | Role |
|---------|------|
| Jedeiah Baladad | Project Manager / Backend Developer |
| Joseph Anthony Lontok | Backend & Database Developer |
| Sean Ewwey Ongjoco | AI / NLP Developer |
| Alyssa Jean Gocon | Frontend Developer |
| Ali Zander Ramon | Frontend Developer |

---

# 📄 License

This project was developed for academic purposes as part of the Application Development course.

---

# 📬 Contact

For questions or suggestions, please contact the development team through the project's GitHub repository.