import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";
import { useUI } from "../../context/UIContext";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa6";
import logo from "../../assets/app_icon_purple.png";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setLoading, notify } = useUI();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      notify.error("Şifreler uyuşmuyor 😕");
      return;
    }

    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (name) await updateProfile(user, { displayName: name });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        createdAt: serverTimestamp(),
      });

      notify.success("Kayıt başarılı 🎉");
      navigate("/dashboard");
    } catch (err) {
      console.error("Register error:", err);
      let msg = "Kayıt işlemi başarısız 😕";

      if (err.code === "auth/email-already-in-use")
        msg = "Bu e-posta adresi zaten kayıtlı.";
      else if (err.code === "auth/invalid-email")
        msg = "Geçersiz e-posta formatı.";
      else if (err.code === "auth/weak-password") msg = "Şifre çok zayıf.";
      else if (err.code === "auth/network-request-failed")
        msg = "Ağ bağlantısı hatası.";

      notify.error(msg);
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

        <form onSubmit={handleRegister} className="flex flex-col gap-4 w-full">
          <Input
            type="text"
            name="name"
            placeholder="Kullanıcı adı"
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon={FaUser}
          />
          <Input
            type="email"
            name="email"
            placeholder="E-posta adresi"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={FaEnvelope}
          />
          <Input
            type="password"
            name="password"
            placeholder="Şifre oluştur"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Şifreyi tekrar gir"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button type="submit" variant="primary" className="w-full mt-2">
            Kayıt Ol
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-text-secondary">
          Zaten hesabın var mı?{" "}
          <Link
            to="/auth/login"
            className="text-secondary hover:text-hover-secondary font-semibold"
          >
            Giriş Yap
          </Link>
        </div>
      </div>
    </div>
  );
}
