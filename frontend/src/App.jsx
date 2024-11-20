import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import ContactsPage from "./pages/ContactsPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
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

          {/* Catch-All Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
