# Contact Manager

A modern, full-stack contact management solution built with the MERN stack (MongoDB, Express.js, React.js, Node.js). Securely store, organize, and manage your contacts with an intuitive user interface and powerful features.

## 🚀 Features

### Core Functionality
- **Smart Contact Management**
  - Create, read, update, and delete contacts

### User Experience
  - Search contacts
  - Advanced filtering options
  - Sort by multiple criteria
  - Responsive design for all devices

### Security
- **Robust Authentication**
  - JWT-based authentication
  - Password encryption

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Router** - Navigation

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication

## 📦 Installation

### Prerequisites
- Node.js >= 16.x
- MongoDB >= 5.x
- npm >= 8.x

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/lahiruanushka/mern-contact-manager.git
cd mern-contact-manager
```

2. **Set up environment variables**
```bash
# Create .env files
cp backend/.env.example backend/.env  # Backend

# Configure your environment variables

# Backend (backend/.env)
PORT=5000
CONNECTION_STRING=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_jwt_secret
```

3. **Install dependencies and start the application**
```bash
# Install backend dependencies
cd backend
npm install

# Start the backend server
npm run dev

# In a new terminal, install frontend dependencies
cd frontend
npm install

# Start the frontend application
npm run dev
```

## 🗂️ Project Structure

```
contact-manager/
├── frontend/
│   ├── public/
│   │   └── assets/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── context/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
```

## 📱 API Documentation

### Authentication Endpoints
```
POST   /api/auth/register     # Create new account
POST   /api/auth/login        # Login to existing account
GET    /api/auth/me          # Get current user
```

### Contact Endpoints
```
GET    /api/contacts         # List all contacts
POST   /api/contacts         # Create new contact
GET    /api/contacts/:id     # Get contact details
PUT    /api/contacts/:id     # Update contact
DELETE /api/contacts/:id     # Delete contact
```

## 📸 Screenshots

### Home Page
The home view of the app.

![Contact Manager](/docs/screenshots/home.png)

### Add Contact Modal
Modal for add contact.

![Contact Manager](/docs/screenshots/add-contact.png)

### Edit Contact Modal
Modal for edit contact.

![Contact Manager](/docs/screenshots/edit-contact.png)

### Login Page

![Contact Manager](/docs/screenshots/login.png)

### Register Page

![Contact Manager](/docs/screenshots/register.png)
