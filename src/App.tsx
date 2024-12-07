import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthLayout } from "./components/AuthLayout";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import CategoriesPage from "./pages/Category";
import { BookPage } from "./pages/BookPage";
import { BookForm } from "./components/Book/BookForm";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AuthLayout>
                  <Dashboard />
                </AuthLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/books"
            element={
              <ProtectedRoute>
                <AuthLayout>
                  <BookPage />
                </AuthLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <AuthLayout>
                  <CategoriesPage />
                </AuthLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/books/form"
            element={
              <ProtectedRoute>
                <AuthLayout>
                  <BookForm />
                </AuthLayout>
              </ProtectedRoute>
            }
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
