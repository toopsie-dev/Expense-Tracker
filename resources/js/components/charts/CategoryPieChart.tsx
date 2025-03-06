import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface Category {
    name: string;
    spent: number;
    color: string;
}

interface CategoryPieChartProps {
    categories: Category[];
    title?: string;
    height?: string | number;
}

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({
    categories,
    title = "Expense Categories",
    height = "h-64",
}) => {
    // Format data for the pie chart
    const chartData = categories.map((category) => ({
        name: category.name,
        value: category.spent,
        color: category.color,
    }));

    return (
        <div className="bg-gray-800 rounded-lg p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold mb-4">{title}</h3>
            <div
                className={`${height} md:h-64 flex justify-center items-center mb-4`}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={2}
                            dataKey="value"
                            label={({ name, percent }) =>
                                `${name.split(" ")[0]} ${(
                                    percent * 100
                                ).toFixed(0)}%`
                            }
                            labelLine={false}
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value) => [`$${value}`, "Amount"]}
                            contentStyle={{
                                backgroundColor: "#333",
                                borderColor: "#555",
                            }}
                            labelStyle={{ color: "#fff" }}
                            itemStyle={{ color: "#fff" }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
                {categories.slice(0, 5).map((category, idx) => (
                    <div
                        key={idx}
                        className="flex items-center justify-between"
                    >
                        <div className="flex items-center">
                            <div
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: category.color }}
                            ></div>
                            <span className="text-sm">{category.name}</span>
                        </div>
                        <div className="text-sm">${category.spent}</div>
                    </div>
                ))}
                {categories.length > 5 && (
                    <div className="text-center mt-2">
                        <button className="text-sm text-purple-400 hover:text-purple-300">
                            View all categories
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryPieChart;
