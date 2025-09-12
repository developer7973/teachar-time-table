import { Link, NavLink } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
function Header() {
       AOS.init({
        duration: 1200,
        once: false,
        offset: 0,
    });

    const value = [
        { title: "Home", path: "/" },
        { title: "Dashboard", path: "/dashboard" },
       
    ];

    return (
        <header data-aos="fade-down" className=" text-white top-0 pt-5  left-0 w-full z-50">
            <div className="container font-inter rounded-full  bg-white/10 backdrop-blur-2xl flex items-center justify-between">
            <div className="flex justify-between py-2 w-full px-10  items-center">

                <Link to="/" className="text-3xl italic font-medium text-white">
                    <span className="text-customTeal">TimeT</span>able
                </Link>

                  <div className="flex gap-5">
                        {value.map((item: any, index: number) => (
                            <NavLink
                                to={item.path}
                                key={index + item.title}
                                className="  rounded-full px-6 py-3 transition duration-300 bg-white/20 hover:bg-customTeal"
                            >
                                <h1 className="text-lg font-medium">{item.title}</h1>
                            </NavLink>
                        ))}
                    </div>
            </div>
            </div>
        </header>
    );
}

export default Header;
