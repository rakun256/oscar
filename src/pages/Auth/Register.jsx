import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useUI } from "../../context/UIContext";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa6";
import logo from "../../assets/app_icon_purple.png";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { setLoading, notify } = useUI();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      await updateProfile(user, { displayName: form.name });

      notify.success("Kayıt başarılı 🎉");
      navigate("/dashboard");
    } catch (err) {
      console.error("Register error:", err);
      notify.error("Kayıt işlemi başarısız 😕");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg text-text animate-fade-in px-6">
      <div className="w-full max-w-sm flex flex-col gap-6 items-center justify-center">
        <img src={logo} alt="Application Logo" className="w-32 h-32" />
        <h1 className="text-3xl font-bold text-center text-primary mb-6">
          Kayıt Ol
        </h1>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <Input
            type="text"
            name="name"
            placeholder="Kullanıcı adı"
            value={form.name}
            onChange={handleChange}
            icon={FaUser}
          />
          <Input
            type="email"
            name="email"
            placeholder="E-posta adresi"
            value={form.email}
            onChange={handleChange}
            icon={FaEnvelope}
          />
          <Input
            type="password"
            name="password"
            placeholder="Şifre oluştur"
            value={form.password}
            onChange={handleChange}
            icon={FaLock}
          />

          <Button type="submit" variant="primary" className="w-full mt-2">
            Kayıt Ol
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-text-secondary">
          Zaten hesabın var mı?{" "}
          <Link
            to="/login"
            className="text-secondary hover:text-hover-secondary font-semibold"
          >
            Giriş Yap
          </Link>
        </div>
      </div>
    </div>
  );
}
