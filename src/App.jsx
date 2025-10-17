import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UIProvider } from "./context/UIContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ComponentTest from "./pages/Test/ComponentTest.jsx";

function App() {
  return (
    <>
      <UIProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/test" element={<ComponentTest />} />
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
