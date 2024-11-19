import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import AddContact from "./components/AddContact";
import ContactsPage from "./pages/ContactsPage";
import NotFoundPage from "./pages/NotFoundPage";
import ContactDetails from "./components/ContactDetails";
import LoginPage from "./pages/LoginPage";
import EditContact from "./components/EditContact";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectIfAuthenticated from "./components/RedirectIfAuthenticated";
import Header from "./components/Header";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          {/* Auth Routes */}
          <Route
            path="/login"
            element={<RedirectIfAuthenticated element={<LoginPage />} />}
          />
          <Route
            path="/register"
            element={<RedirectIfAuthenticated element={<RegisterPage />} />}
          />

          {/* Protected Routes */}
          <Route
            path="/"
            element={<ProtectedRoute element={<ContactsPage />} />}
          />
          <Route
            path="/contacts/add"
            element={<ProtectedRoute element={<AddContact />} />}
          />
          <Route
            path="/contacts/:id"
            element={<ProtectedRoute element={<ContactDetails />} />}
          />
          <Route
            path="/contacts/edit/:id"
            element={<ProtectedRoute element={<EditContact />} />}
          />

          {/* Catch-All Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
