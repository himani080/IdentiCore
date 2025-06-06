# Identity Reconciliation System

A full-stack application that implements identity reconciliation as specified in the Bitespeed task. The system identifies and links customer contact information, creating a unified view of customer identities.

## Features

- Backend API for identity reconciliation
- Contact linking and relationship management
- Frontend dashboard to test the API
- Admin panel to view all contacts
- Visualization of primary and secondary contacts
- Real-time API response preview

## Tech Stack

- **Frontend**: React, Tailwind CSS, Framer Motion, Axios
- **Backend**: Node.js, Express
- **Database**: MySQL (with SQLite fallback)

## Project Structure

The project is organized into two main folders:

```
/frontend - React application
/backend - Node.js Express API
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL (optional, will fall back to SQLite if MySQL is not available)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm run install:all
```

3. Configure the database:

```bash
# Copy .env.example to .env in the backend folder
cp backend/.env.example backend/.env
# Edit .env file with your database credentials
```

4. Start the application:

```bash
npm start
```

This will start both the frontend and backend servers.

## API Endpoints

### POST /identify

Identifies a contact based on email and/or phone number.

**Request Body:**

```json
{
  "email": "example@example.com",
  "phoneNumber": "+1234567890"
}
```

**Response:**

```json
{
  "contact": {
    "primaryContactId": 1,
    "emails": ["example@example.com"],
    "phoneNumbers": ["+1234567890"],
    "secondaryContactIds": []
  }
}
```

### GET /identify/contacts

Returns all contacts (for admin purposes).

## License

MIT