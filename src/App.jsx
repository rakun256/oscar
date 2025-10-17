import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UIProvider } from "./context/UIContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <>
      <UIProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route />
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
