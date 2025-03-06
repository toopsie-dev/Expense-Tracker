import React from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

interface MonthlyData {
    name: string;
    expenses: number;
    income: number;
}

interface IncomeExpenseChartProps {
    data: MonthlyData[];
    title?: string;
    height?: string;
}

const IncomeExpenseChart: React.FC<IncomeExpenseChartProps> = ({
    data,
    title = "Monthly Income vs Expenses",
    height = "h-80",
}) => {
    return (
        <div className="bg-gray-800 rounded-lg p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold mb-4">{title}</h3>
            <div className={`h-64 md:${height}`}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="name" stroke="#999" />
                        <YAxis stroke="#999" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#333",
                                borderColor: "#555",
                            }}
                            labelStyle={{ color: "#fff" }}
                            itemStyle={{ color: "#fff" }}
                            formatter={(value) => [`$${value}`, ""]}
                        />
                        <Legend />
                        <Bar
                            dataKey="expenses"
                            name="Expenses"
                            fill="#f87171"
                        />
                        <Bar dataKey="income" name="Income" fill="#4ade80" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default IncomeExpenseChart;
