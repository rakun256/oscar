import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import logo from "../../assets/app_icon_purple.png";
import { useAuth } from "../../context/AuthContext";

export default function WelcomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-around md:justify-center min-h-screen bg-bg text-text animate-fade-in px-6 md:gap-12">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-primary mb-2">
          Oscar
        </h1>
        <p className="text-text-secondary text-sm md:text-lg font-medium">
          Küçük topluluklar için görev paylaşımını kolaylaştır. <br /> Herkes
          görevini yaptığında, tribe huzurlu olur 💫
        </p>
      </div>

      <div className="w-40 h-40 rounded-full bg-accent/30 flex items-center justify-center text-accent text-6xl font-bold shadow-inner">
        <img src={logo} alt="Application Logo" className="w-32 h-32" />
      </div>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Button
          variant="outline_primary"
          onClick={() => {
            if (!user) {
              navigate("/login");
            } else {
              navigate("/dashboard");
            }
          }}
          className="w-full"
        >
          Giriş Yap | Dashboard'a git
        </Button>

        <Button
          variant="secondary"
          onClick={() => navigate("/register")}
          className="w-full"
        >
          Kayıt Ol
        </Button>
      </div>

      <footer className="md:absolute md:bottom-0 text-sm text-text-secondary opacity-80 md:bg-accent w-full py-5 text-center">
        <p>© 2025 Oscar • Birlikte başarmak güzeldir 🌱</p>
      </footer>
    </div>
  );
}
