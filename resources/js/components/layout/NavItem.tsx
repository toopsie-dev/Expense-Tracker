import React, { ReactNode } from "react";

interface NavItemProps {
    href: string;
    active: boolean;
    title: string;
    icon: ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ href, active, title, icon }) => {
    return (
        <li>
            <a
                href={href}
                className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                    active
                        ? "bg-purple-900/30 text-white"
                        : "text-gray-400 hover:bg-gray-800 hover:text-gray-300"
                }`}
            >
                <svg
                    className="w-5 h-5 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {icon}
                </svg>
                {title}
            </a>
        </li>
    );
};

export default NavItem;
