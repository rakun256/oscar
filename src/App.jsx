import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UIProvider } from "./context/UIContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <>
      <UIProvider>
        <AuthProvider></AuthProvider>
      </UIProvider>
    </>
  );
}

export default App;
