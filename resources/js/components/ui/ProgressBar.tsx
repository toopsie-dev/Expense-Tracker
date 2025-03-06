import React from "react";

interface ProgressBarProps {
    current: number;
    max: number;
    bgColor?: string;
    showPercentage?: boolean;
    height?: string;
    label?: string;
    className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
    current,
    max,
    bgColor = "bg-gradient-to-r from-purple-600 to-blue-500",
    showPercentage = true,
    height = "h-2.5",
    label,
    className = "",
}) => {
    const percentage = Math.round((current / max) * 100);

    return (
        <div className={className}>
            {label && (
                <div className="flex justify-between mb-1 text-sm">
                    <span>{label}</span>
                    <span>
                        ${current} of ${max}
                    </span>
                </div>
            )}
            <div className={`w-full bg-gray-700 rounded-full ${height}`}>
                <div
                    className={`${bgColor} ${height} rounded-full`}
                    style={{ width: `${Math.min(100, percentage)}%` }}
                ></div>
            </div>
            {showPercentage && (
                <div className="text-xs mt-1 text-gray-400 text-right">
                    {percentage}% {max !== undefined ? "of goal" : ""}
                </div>
            )}
        </div>
    );
};

export default ProgressBar;
