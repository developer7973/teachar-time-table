import { Link } from "react-router-dom"

const Header = () => {
    const value = [
        {
            title: "Home",
            path: "/"
        },
        {
            title: "p2",
            path: "/p2"
        },
        {
            title: "p3",
            path: "/p3"
        },
        {
            title: "p4",
            path: "/p4"
        },
    ]
    return (
        <>
            <div className="container flex text-white font-inter ">
                <div className="inline-flex mx-auto p-2  justify-center items-center  bg-white/10 gap-4  backdrop-blur-md rounded-full">
                    <div className="flex">
                        {value.map((item: any, index: number) => (
                            <Link
                                to={item.path}
                                key={index + item.title}
                                className="  rounded-full px-6 py-3 transition duration-300 bg-white/20 hover:bg-customTeal"
                            >
                                <h1 className="text-lg font-medium">{item.title}</h1>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header
