# 🛂 Identicore – Identity Reconciliation System

**Identicore** is a full-stack application that resolves overlapping user identities based on email and phone number. It builds relationships between primary and secondary contact records, ensuring unified identity representation.

🌐 **Live Demo**: [http://13.203.218.89:5173](http://13.203.218.89:5173)

---

## ⚙️ Tech Stack

- **Frontend**: React.js + Tailwind CSS (`http://localhost:5173`)
- **Backend**: Node.js + Express (`http://localhost:3000`)
- **Database**: MySQL (`localhost:3306`)
- **Tools**: Docker, Docker Compose, Concurrently
- **Deployment**: AWS EC2

---

## 🚀 Getting Started

You can run the project either using Docker or manually via Node.js:

---

### 🔁 Option 1: Run with Docker (Recommended)

#### ✅ Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop/) installed

#### 📦 Steps

```bash
# 1. Clone the repository
git clone https://github.com/himani080/identity-reconciliation.git
cd identity-reconciliation

# 2. Start the services
docker-compose up --build

This will run:

    MySQL service

    Backend on port 3000

    Frontend on port 5173

Open in browser: http://localhost:5173
🛠️ Option 2: Run Locally with NPM
✅ Prerequisites

    Node.js installed

    MySQL installed and running

📦 Steps

# 1. Clone the repository
git clone https://github.com/himani080/identity-reconciliation.git
cd identity-reconciliation

# 2. Install all dependencies
npm run install:all

# 3. Start frontend and backend together
npm start

    Frontend: http://localhost:5173

    Backend: http://localhost:3000

📄 .env Setup (Backend)

Create a .env file inside the backend/ directory:

USE_SQLITE=******
DB_HOST=*****
DB_USER=********
DB_PASSWORD=*******
DB_NAME=identity_reconciliation
PORT=****

    ℹ️ If you're not using Docker, set DB_HOST=localhost.

📦 NPM Scripts

From the root directory, these scripts are available:

"scripts": {
  "start": "concurrently \"npm run frontend\" \"npm run backend\"",
  "frontend": "cd frontend && npm run dev",
  "backend": "cd backend && npm start",
  "install:all": "npm install && cd frontend && npm install && cd ../backend && npm install",
  "build": "cd frontend && npm run build",
  "deploy": "netlify deploy"
}

📁 Folder Structure

.
├── backend/              # Node.js backend
├── frontend/             # React frontend
├── docker-compose.yml    # Docker setup
├── .env                  # Backend environment variables
├── package.json

🧪 API Usage
POST /identify

Request:

{
  "email": "john@example.com",
  "phoneNumber": "1234567890"
}

Response:

{
  "contact": {
    "primaryContactId": 1,
    "emails": ["john@example.com"],
    "phoneNumbers": ["1234567890"],
    "secondaryContactIds": [2]
  }
}

🗃 Database Schema

Table: Contact
Field	Type	Description
id	INT	Primary key
phoneNumber	VARCHAR	Phone number
email	VARCHAR	Email address
linkedId	INT	References primary contact (nullable)
linkPrecedence	ENUM	'primary' or 'secondary'
createdAt	DATETIME	Created time
updatedAt	DATETIME	Updated time
deletedAt	DATETIME	Soft delete (nullable)
👩‍💻 Developed By

Himani Arora
Backend Developer Intern | MERN Stack Enthusiast
