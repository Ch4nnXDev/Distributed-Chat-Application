
import { User, Search, MessageCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();

    const selected = location.pathname;

    return (
        <nav className="w-full border-b border-gray-200 bg-white">
            <div className="mx-auto flex max-w-4xl items-center px-6 py-3">

                <ul className="relative flex items-center gap-1">

                    {/* Sliding highlight */}
                    <div
                        className={`absolute top-0 h-11 rounded-lg bg-gray-100 transition-all duration-300 ease-in-out
                            ${selected === "/profile" ? "left-0 w-[110px]" : ""}
                            ${selected === "/new" ? "left-[114px] w-[110px]" : ""}
                            ${selected === "/chats" ? "left-[228px] w-[110px]" : ""}
                        `}
                    />

                    {/* Profile */}
                    <li
                        onClick={() => navigate("/profile")}
                        className={`relative z-10 flex h-11 w-[110px] cursor-pointer items-center justify-center gap-2 rounded-lg text-sm transition-colors
                            ${
                                selected === "/profile"
                                    ? "text-gray-900"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            }
                        `}
                    >
                        <User
                            size={21}
                            strokeWidth={selected === "/profile" ? 2 : 1.8}
                        />

                        <span>Profile</span>
                    </li>

                    {/* Search */}
                    <li
                        onClick={() => navigate("/new")}
                        className={`relative z-10 flex h-11 w-[110px] cursor-pointer items-center justify-center gap-2 rounded-lg text-sm transition-colors
                            ${
                                selected === "/new"
                                    ? "text-gray-900"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            }
                        `}
                    >
                        <Search
                            size={21}
                            strokeWidth={selected === "/new" ? 2 : 1.8}
                        />

                        <span>Search</span>
                    </li>

                    {/* Chats */}
                    <li
                        onClick={() => navigate("/chats")}
                        className={`relative z-10 flex h-11 w-[110px] cursor-pointer items-center justify-center gap-2 rounded-lg text-sm transition-colors
                            ${
                                selected === "/chats"
                                    ? "text-gray-900"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            }
                        `}
                    >
                        <MessageCircle
                            size={21}
                            strokeWidth={selected === "/chats" ? 2 : 1.8}
                        />

                        <span>Chats</span>
                    </li>

                </ul>

            </div>
        </nav>
    );
}
