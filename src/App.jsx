import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UIProvider } from "./context/UIContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ComponentTest from "./pages/Test/ComponentTest.jsx";
import WelcomePage from "./pages/Auth/Welcome.jsx";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";

function App() {
  return (
    <>
      <UIProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/test" element={<ComponentTest />} />
              <Route path="/" element={<WelcomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}></Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </UIProvider>
    </>
  );
}

export default App;
