import React from "react";

interface Category {
    name: string;
    budget: number;
    spent: number;
    color: string;
}

interface BudgetTrackerProps {
    categories: Category[];
    title?: string;
    maxItems?: number;
    showViewAll?: boolean;
}

const BudgetTracker: React.FC<BudgetTrackerProps> = ({
    categories,
    title = "Budget Tracking",
    maxItems = 4,
    showViewAll = true,
}) => {
    return (
        <div className="bg-gray-800 rounded-lg p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold mb-4">{title}</h3>
            <div className="space-y-4">
                {categories.slice(0, maxItems).map((category, idx) => (
                    <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-sm">
                            <span>{category.name}</span>
                            <span>
                                ${category.spent} of ${category.budget}
                            </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                                className="h-2 rounded-full"
                                style={{
                                    width: `${Math.min(
                                        100,
                                        (category.spent / category.budget) * 100
                                    )}%`,
                                    backgroundColor: category.color,
                                }}
                            ></div>
                        </div>
                        <div className="text-xs text-right text-gray-400">
                            {Math.round(
                                (category.spent / category.budget) * 100
                            )}
                            % of budget
                        </div>
                    </div>
                ))}
                {showViewAll && categories.length > maxItems && (
                    <div className="text-center mt-2">
                        <button className="text-sm text-purple-400 hover:text-purple-300">
                            Manage Budget Limits
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BudgetTracker;
