import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useUI } from "./UIContext";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const { setLoading, notify } = useUI();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
      if (!authChecked) setAuthChecked(true);
      setLoading(false);
    });
    return unsub;
  }, []);

  const navigate = useNavigate();
  const logout = async () => {
    try {
      await signOut(auth);
      notify.success("Başarıyla çıkış yapıldı");
      console.log("Çıkış başarılı");
      navigate("/");
    } catch (e) {
      notify.error("Çıkış yapılırken bir hata oluştu");
      console.error("Hata:", e);
    }
  };

  const value = useMemo(() => ({ user, logout }), [user]);

  if (!authChecked) return null;
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
