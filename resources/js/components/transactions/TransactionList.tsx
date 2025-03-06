import React from "react";
import TransactionItem from "./TransactionItem";

interface Transaction {
    id: number;
    description: string;
    amount: number;
    date: string;
    category: string;
    categoryColor: string;
}

interface TransactionListProps {
    transactions: Transaction[];
    title?: string;
    maxHeight?: string;
    showViewAll?: boolean;
    onViewAllClick?: () => void;
}

const TransactionList: React.FC<TransactionListProps> = ({
    transactions,
    title = "Recent Transactions",
    maxHeight = "max-h-[350px]",
    showViewAll = true,
    onViewAllClick = () => {},
}) => {
    return (
        <div className="bg-gray-800 rounded-lg p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg md:text-xl font-semibold">{title}</h3>
                {showViewAll && (
                    <button
                        className="text-sm text-purple-400 hover:text-purple-300"
                        onClick={onViewAllClick}
                    >
                        View All
                    </button>
                )}
            </div>
            <div className={`space-y-3 overflow-y-auto ${maxHeight} pr-1`}>
                {transactions.length > 0 ? (
                    transactions.map((transaction) => (
                        <TransactionItem
                            key={transaction.id}
                            id={transaction.id}
                            description={transaction.description}
                            amount={transaction.amount}
                            date={transaction.date}
                            category={transaction.category}
                            categoryColor={transaction.categoryColor}
                        />
                    ))
                ) : (
                    <div className="text-center py-6 text-gray-400">
                        No transactions found
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransactionList;
