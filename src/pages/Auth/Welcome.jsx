import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg text-text animate-fade-in px-6">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-primary mb-2">
          Oscar
        </h1>
        <p className="text-text-secondary text-base font-medium max-w-sm">
          Küçük topluluklar için görev paylaşımını kolaylaştır. Herkes görevini
          yaptığında, tribe huzurlu olur 💫
        </p>
      </div>

      <div className="w-40 h-40 mb-10 rounded-full bg-accent/30 flex items-center justify-center text-accent text-6xl font-bold shadow-inner">
        🐾
      </div>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Button
          variant="outline_primary"
          onClick={() => navigate("/auth/login")}
          className="w-full"
        >
          Giriş Yap
        </Button>

        <Button
          variant="secondary"
          onClick={() => navigate("/auth/register")}
          className="w-full"
        >
          Kayıt Ol
        </Button>
      </div>

      <footer className="mt-10 text-xs text-text-secondary opacity-80">
        <p>© 2025 Oscar • Birlikte başarmak güzeldir 🌱</p>
      </footer>
    </div>
  );
}
