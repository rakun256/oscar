import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useUI } from "../../context/UIContext";
import { useAuth } from "../../context/AuthContext";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { FaEnvelope } from "react-icons/fa6";
import logo from "../../assets/app_icon_purple.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoading, notify } = useUI();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    navigate("/dashboard");
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      notify.success("Giriş başarılı 🎉");
      navigate("/dashboard");
    } catch (err) {
      notify.error("E-posta veya şifre hatalı 😕");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg text-text animate-fade-in px-6 md:gap-12">
      <div className="flex flex-col w-full max-w-sm items-center justify-center gap-6">
        <img src={logo} alt="Application Logo" className="w-32 h-32" />
        <h1 className="text-3xl font-bold text-center text-primary">
          Giriş Yap
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="E-posta adresi"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={FaEnvelope}
          />
          <Input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" variant="primary" className="w-full mt-2">
            Giriş Yap
          </Button>

          <div className="text-center mt-3">
            <Link
              to="/forgot-password"
              className="text-sm text-secondary hover:text-hover-secondary transition"
            >
              Şifremi Unuttum
            </Link>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-text-secondary">
          Hesabın yok mu?{" "}
          <Link
            to="/register"
            className="text-secondary hover:text-hover-secondary font-semibold"
          >
            Kayıt Ol
          </Link>
        </div>
      </div>
    </div>
  );
}
