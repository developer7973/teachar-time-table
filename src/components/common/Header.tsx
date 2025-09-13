import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Theme from "../ui/Themebutton";
import { useTheme } from "../../Context/ThemeProvider";
import { Menu, X } from "lucide-react";

function Header() {
  const { theme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  AOS.init({
    duration: 1200,
    once: false,
    offset: 0,
  });

  const navItems = [
    { title: "Tables", path: "/" },
    { title: "Dashboard", path: "/dashboard" },
  ];

  return (
    <header className="container top-0 left-0 w-full z-50 pt-4 px-4 sm:px-6 ">
      <div
        className={`font-inter rounded-full mt-5 ${
          theme ? "bg-black/5 backdrop-blur-md" : "bg-white/10 backdrop-blur-sm"
        } flex items-center justify-between px-5 py-3 shadow-lg`}
      >
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl sm:text-3xl italic font-medium text-white"
        >
          <span className="text-customTeal">TimeT</span>able
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {navItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.title}
              className="rounded-full duration-300 bg-white/20 hover:bg-customTeal text-sm font-medium flex items-center gap-2 px-4 py-2 transition-colors"
            >
              <h1 className="text-base font-medium">{item.title}</h1>
            </NavLink>
          ))}
          <Theme />
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div
          className={`md:hidden mt-3 rounded-2xl p-4 flex flex-col gap-3 shadow-lg 
          ${
            theme
              ? "bg-black/10 backdrop-blur-lg"
              : "bg-white/10 backdrop-blur-lg text-white"
          }`}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              className="px-3 py-2 rounded-lg hover:bg-customTeal transition"
              onClick={() => setMenuOpen(false)}
            >
              {item.title}
            </NavLink>
          ))}
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm">Theme</span>
            <Theme />
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
