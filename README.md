
# 🛂 Identicore – Identity Reconciliation System

**Identicore** is a full-stack application that resolves overlapping user identities based on email and phone number. It builds relationships between primary and secondary contact records, ensuring unified identity representation.

🌐 **Live Demo**: [http://52.66.243.92:5173/](http://52.66.243.92:5173/)
![image](https://github.com/user-attachments/assets/556ee632-a96f-492f-9017-7fc75cf529c7)
![image](https://github.com/user-attachments/assets/897abd84-5960-4153-8e37-8ccb3ec7e1e9)


![image](https://github.com/user-attachments/assets/d72f6853-2d9c-4aa3-9b62-41d1e6a4ed31)


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
```

This will run:

- MySQL service  
- Backend on port **3000**  
- Frontend on port **5173**  

🌐 Open in browser: [http://localhost:5173](http://localhost:5173)

---

### 🛠️ Option 2: Run Locally with NPM

#### ✅ Prerequisites

- Node.js installed  
- MySQL installed and running  

#### 📦 Steps

```bash
# 1. Clone the repository
git clone https://github.com/himani080/identity-reconciliation.git
cd identity-reconciliation

# 2. Install all dependencies
npm run install:all

# 3. Start frontend and backend together
npm start
```

- Frontend: [http://localhost:5173](http://localhost:5173)  
- Backend: [http://localhost:3000](http://localhost:3000)  

---

### 📄 .env Setup (Backend)

Create a `.env` file inside the `backend/` directory with the following content:

```
USE_SQLITE=******
DB_HOST=*****
DB_USER=********
DB_PASSWORD=*******
DB_NAME=identity_reconciliation
PORT=****
```

ℹ️ If you're not using Docker, set `DB_HOST=localhost`.


```

---

### 📁 Folder Structure

```
.
├── backend/
   __.env             # Node.js backend
├── frontend/             # React frontend
├── docker-compose.yml    # Docker setup
├── package.json
```

---

### 🧪 API Usage

#### `POST /identify`

**Request:**
```json
{
  "email": "himani12@gmail.com",
  "phoneNumber": "1234567890"
}
```

**Response:**
```json

  "contact": {
    "primaryContactId": 13,
    "emails": [
      "himani12@gmail.com"
    ],
    "phoneNumbers": [
      "1234567890"
    ],
    "secondaryContactIds": []
  }
}
```

---

### 🗃 Database Schema

| Field         | Type      | Description                          |
|---------------|-----------|--------------------------------------|
| `id`          | INT       | Primary key                          |
| `phoneNumber` | VARCHAR   | Phone number                         |
| `email`       | VARCHAR   | Email address                        |
| `linkedId`    | INT       | References primary contact (nullable)|
| `linkPrecedence` | ENUM  | `'primary'` or `'secondary'`         |
| `createdAt`   | DATETIME  | Created time                         |
| `updatedAt`   | DATETIME  | Updated time                         |
| `deletedAt`   | DATETIME  | Soft delete (nullable)               |

---

### 👩‍💻 Developed By

**Himani Arora**  
Backend Developer Intern | MERN Stack Enthusiast
