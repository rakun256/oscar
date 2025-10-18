import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useUI } from "../context/UIContext";
import { FaTasks, FaCrown, FaUsers, FaCog, FaSignOutAlt } from "react-icons/fa";

export default function Navbar() {
  const { logout } = useAuth();
  const { setLoading, notify } = useUI();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      notify.success("Çıkış yapıldı");
      navigate("/auth/login");
    } finally {
      setLoading(false);
    }
  };

  const isTribePage = location.pathname.startsWith("/test");

  if (!isTribePage) return null;

  const navItems = [
    { path: "/tribe/:id/dashboard", label: "Tasks", icon: FaTasks },
    { path: "/tribe/:id/leaderboard", label: "Leaderboard", icon: FaCrown },
    { path: "/tribe/:id/members", label: "Members", icon: FaUsers },
    { path: "/tribe/:id/settings", label: "Settings", icon: FaCog },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-bg-soft border-t shadow-md flex justify-around py-2 z-50">
      {navItems.map(({ path, label, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${
              isActive
                ? "text-primary font-semibold"
                : "text-border-strong hover:text-primary transition"
            }`
          }
        >
          <Icon className="text-lg mb-1" />
          {label}
        </NavLink>
      ))}

      <button
        onClick={handleLogout}
        className="flex flex-col items-center text-sm text-border-strong hover:text-error transition cursor-pointer"
      >
        <FaSignOutAlt className="text-lg mb-1" />
        Log Out
      </button>
    </nav>
  );
}
