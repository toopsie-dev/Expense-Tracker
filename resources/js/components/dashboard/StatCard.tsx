import React, { ReactNode } from "react";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: ReactNode;
    iconBgColor?: string;
    iconColor?: string;
    textColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    icon,
    iconBgColor = "bg-purple-900/30",
    iconColor = "text-purple-400",
    textColor = "text-white",
}) => {
    return (
        <div className="bg-gray-800 rounded-lg p-4 md:p-6 flex justify-between items-center">
            <div>
                <div className="text-gray-400 mb-1">{title}</div>
                <div className={`text-xl md:text-3xl font-bold ${textColor}`}>
                    {value}
                </div>
            </div>
            <div className={`${iconBgColor} p-3 rounded-lg`}>
                <div className={`w-6 h-6 md:w-8 md:h-8 ${iconColor}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default StatCard;
