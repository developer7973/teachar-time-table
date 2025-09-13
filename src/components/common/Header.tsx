import { Link, NavLink } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Theme from "../ui/Themebutton";
import { useTheme } from "../../Context/ThemeProvider";
function Header() {
  const { theme } = useTheme();
  AOS.init({
    duration: 1200,
    once: false,
    offset: 0,
  });

  const value = [
    { title: "Tables", path: "/" },
    { title: "Dashboard", path: "/dashboard" },
  ];

  return (
    <header data-aos="fade-down" className=" top-0 pt-5  left-0 w-full z-50">
      <div className="container">
        <div
          className={` font-inter rounded-full ${
            theme
              ? "bg-black/5 backdrop-blur-md"
              : "bg-white/10 backdrop-blur-sm"
          }   flex items-center justify-between px-3 pl-10`}
        >
          <div className="flex justify-between py-2 w-full   items-center">
            <Link to="/" className="text-3xl italic font-medium text-white">
              <span className="text-customTeal">TimeT</span>able
            </Link>

            <div
              className={`flex items-center gap-2 ${
                !theme ? "text-slate-300" : "text-white"
              }`}
            >
              {value.map((item: any, index: number) => (
                <NavLink
                  to={item.path}
                  key={index + item.title}
                  className={`  rounded-full  duration-300 bg-white/20 hover:bg-customTeal text-sm font-medium flex items-center gap-2 px-3 md:pl-3  md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10`}
                >
                  <h1 className="text-lg font-medium">{item.title}</h1>
                </NavLink>
              ))}
              {/* Theme Toggle */}
              <Theme />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
