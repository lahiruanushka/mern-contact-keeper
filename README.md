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

## 🔧 Configuration

### Available Scripts

**Frontend:**
```bash
npm run dev         # Start development server
npm run build      # Build for production
```

**Backend:**
```bash
npm run dev        # Start development server
npm start          # Start production server
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

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

### Development Guidelines

- Follow the established code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React Documentation](https://reactjs.org/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/)

---

**[View Demo](https://your-demo-link.com)** | **[Report Bug](https://github.com/lahiruanushka/mern-contact-manager/issues)** | **[Request Feature](https://github.com/lahiruanushka/mern-contact-manager/issues)**

Made with ❤️ by [Lahiru Anushka](https://github.com/lahiruanushka)

