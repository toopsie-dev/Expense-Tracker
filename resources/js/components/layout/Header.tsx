import React from "react";

interface HeaderProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    title: string;
    dateTime: {
        date: string;
        time: string;
    };
}

const Header: React.FC<HeaderProps> = ({
    sidebarOpen,
    setSidebarOpen,
    title,
    dateTime,
}) => {
    return (
        <header className="bg-gray-900 border-b border-gray-800 p-4 flex justify-between items-center">
            <div className="flex items-center">
                {/* Mobile Toggle */}
                <button
                    className="p-1 mr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 lg:hidden"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        ></path>
                    </svg>
                </button>
                <h1 className="text-xl font-semibold">{title}</h1>
            </div>
            <div className="text-gray-400 hidden sm:block">
                {dateTime.date}, {dateTime.time}
            </div>
        </header>
    );
};

export default Header;
