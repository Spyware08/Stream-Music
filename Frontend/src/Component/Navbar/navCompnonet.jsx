import { useState } from "react";
import { IoMdHome } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineLibraryMusic } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const [open, setOpen] = useState(false);
    const Menus = [
        { title: "Home", path: "/home", icon: <IoMdHome /> },
        { title: "Search", path: "/search", icon: <IoMdSearch /> },
        { title: "Library", path: "/library", icon: <MdOutlineLibraryMusic />, gap: true },
    ];

    return (
        <div className="flex text-black  h-screen sm:h-auto">
            {/* Sidebar for larger screens */}
            <div
                className={`hidden sm:flex flex-col ${open ? "w-56" : "w-20"
                    } h-[100vh] p-3 pt-8 relative duration-300 bg-gradient-to-b from-violet-200 to-blue-100 bg-opacity-40 rounded-r-lg`}
            >
                <span className={`absolute cursor-pointer border border-gray-700 text-white bg-blue-600 py-[1px] -right-[.6rem] top-9 w-5 p mt-[3px]
                    rounded-full ${!open && "rotate-180 "}`}
                    onClick={() => setOpen(!open)}
                >
                    <FaArrowLeft />
                </span>
                <div className="flex gap-x-4 items-center">
                    <img
                        src="./img/logoS.ico"
                        className={`w-[2rem] cursor-pointer duration-500 ${open && "rotate-[360deg]"
                            }`}
                    />
                    <h1
                        className={`text-black origin-left font-medium text-xl duration-200 ${!open && "scale-0"
                            }`}
                    >
                        Stream Music
                    </h1>
                </div>

                <ul className="pt-4">
                    {Menus.map((menu, index) => (
                        <NavLink
                            to={menu.path}
                            key={index}
                            className={({ isActive }) => 
                                `flex text-[1.2rem] rounded-md p-2 cursor-pointer hover:bg-light-white text-sm items-center gap-x-4 
                                ${menu.gap ? "mt-6" : "mt-1"} ${isActive ? "text-blue-600" : "text-black"}`
                            }
                        >
                            <span className="text-2xl">{menu.icon}</span>
                            <span className={`${!open && "hidden"} font-semibold origin-left duration-200`}>
                                {menu.title}
                            </span>
                        </NavLink>
                    ))}
                </ul>
            </div>

            <div className="fixed bottom-0 w-full sm:hidden bg-white border-t">
                <ul className="flex justify-around bg-gray-200">
                    {Menus.map((menu, index) => (
                        <NavLink
                            to={menu.path}
                            key={index}
                            className={({ isActive }) => 
                                `flex flex-col items-center p-1 text-[1.2rem] cursor-pointer hover:bg-light-white text-sm  
                                ${isActive ? "text-blue-600" : "text-black"}`
                            }
                        >
                            <span className="text-2xl">{menu.icon}</span>
                            <span className="text-xs">{menu.title}</span>
                        </NavLink>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
