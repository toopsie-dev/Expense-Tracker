import React from "react";

interface TransactionItemProps {
    id: number;
    description: string;
    amount: number;
    date: string;
    category: string;
    categoryColor: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
    id,
    description,
    amount,
    date,
    category,
    categoryColor,
}) => {
    return (
        <div className="p-3 bg-gray-700/50 rounded-lg flex justify-between">
            <div className="flex items-center flex-1 min-w-0">
                <div
                    className={`w-10 h-10 ${categoryColor} rounded-lg flex-shrink-0 flex items-center justify-center mr-3`}
                >
                    {amount > 0 ? (
                        <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 11l5-5m0 0l5 5m-5-5v12"
                            ></path>
                        </svg>
                    ) : (
                        <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 13l-5 5m0 0l-5-5m5 5V6"
                            ></path>
                        </svg>
                    )}
                </div>
                <div className="min-w-0 flex-1">
                    <div className="font-medium truncate">{description}</div>
                    <div className="text-xs text-gray-400 truncate">
                        {category} • {new Date(date).toLocaleDateString()}
                    </div>
                </div>
            </div>
            <div
                className={`text-right font-medium whitespace-nowrap ${
                    amount > 0 ? "text-green-400" : "text-red-400"
                }`}
            >
                {amount > 0 ? "+" : ""}${Math.abs(amount).toFixed(2)}
            </div>
        </div>
    );
};

export default TransactionItem;
