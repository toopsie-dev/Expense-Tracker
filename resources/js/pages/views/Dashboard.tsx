import React from "react";
import BudgetTracker from "../../components/budget/BudgetTracker";
import CategoryPieChart from "../../components/charts/CategoryPieChart";
import IncomeExpenseChart from "../../components/charts/IncomeExpenseChart";
import StatCard from "../../components/dashboard/StatCard";
import ExpenseForm, { ExpenseData } from "../../components/forms/ExpenseForm";
import MainLayout from "../../components/layout/MainLayout";
import TransactionList from "../../components/transactions/TransactionList";
import ProgressBar from "../../components/ui/ProgressBar";

// Dashboard is the main component that composes all the dashboard UI elements
const Dashboard: React.FC = () => {
    // Mock data for the expense tracker
    const stats = {
        totalBudget: 5000,
        totalExpenses: 3250,
        totalIncome: 7500,
        savingsGoal: 2000,
        savingsProgress: 1500,
    };

    const recentTransactions = [
        {
            id: 1,
            description: "Grocery Shopping",
            amount: -120.5,
            date: "2023-05-15",
            category: "Food & Groceries",
            categoryColor: "bg-green-500",
        },
        {
            id: 2,
            description: "Monthly Salary",
            amount: 3500.0,
            date: "2023-05-10",
            category: "Income",
            categoryColor: "bg-blue-500",
        },
        {
            id: 3,
            description: "Electricity Bill",
            amount: -85.75,
            date: "2023-05-08",
            category: "Utilities",
            categoryColor: "bg-yellow-500",
        },
        {
            id: 4,
            description: "Netflix Subscription",
            amount: -14.99,
            date: "2023-05-05",
            category: "Entertainment",
            categoryColor: "bg-purple-500",
        },
        {
            id: 5,
            description: "Freelance Project",
            amount: 850.0,
            date: "2023-05-03",
            category: "Income",
            categoryColor: "bg-blue-500",
        },
    ];

    const categories = [
        { name: "Food & Groceries", budget: 500, spent: 420, color: "#4CAF50" },
        { name: "Housing", budget: 1200, spent: 1200, color: "#2196F3" },
        { name: "Transportation", budget: 300, spent: 250, color: "#FFC107" },
        { name: "Entertainment", budget: 200, spent: 180, color: "#9C27B0" },
        { name: "Utilities", budget: 400, spent: 350, color: "#FF5722" },
        { name: "Health", budget: 150, spent: 75, color: "#E91E63" },
        { name: "Personal", budget: 250, spent: 200, color: "#3F51B5" },
        { name: "Other", budget: 300, spent: 150, color: "#607D8B" },
    ];

    // Chart data for monthly expenses
    const monthlyData = [
        { name: "Jan", expenses: 2400, income: 4000 },
        { name: "Feb", expenses: 1398, income: 3000 },
        { name: "Mar", expenses: 3800, income: 3800 },
        { name: "Apr", expenses: 3908, income: 4800 },
        { name: "May", expenses: 4800, income: 5500 },
        { name: "Jun", expenses: 3800, income: 4300 },
    ];

    // Handle form submission
    const handleExpenseSubmit = (data: ExpenseData) => {
        console.log("Submitting expense:", data);
        // Here you would typically send the data to your backend
        alert("Expense added successfully!");
    };

    return (
        <MainLayout>
            <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                <StatCard
                    title="Total Budget"
                    value={`$${stats.totalBudget.toLocaleString()}`}
                    icon={
                        <svg
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                    }
                />
                <StatCard
                    title="Total Expenses"
                    value={`$${stats.totalExpenses.toLocaleString()}`}
                    icon={
                        <svg
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                            ></path>
                        </svg>
                    }
                    iconBgColor="bg-red-900/30"
                    iconColor="text-red-400"
                    textColor="text-red-400"
                />
                <StatCard
                    title="Total Income"
                    value={`$${stats.totalIncome.toLocaleString()}`}
                    icon={
                        <svg
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                            ></path>
                        </svg>
                    }
                    iconBgColor="bg-green-900/30"
                    iconColor="text-green-400"
                    textColor="text-green-400"
                />

                {/* Savings Goal Card */}
                <div className="bg-gray-800 rounded-lg p-4 md:p-6">
                    <div className="text-gray-400 mb-1">Savings Goal</div>
                    <ProgressBar
                        current={stats.savingsProgress}
                        max={stats.savingsGoal}
                        showPercentage={true}
                    />
                </div>
            </div>

            {/* Charts and Forms Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
                {/* Monthly Expenses Chart */}
                <div className="lg:col-span-3 xl:col-span-2">
                    <IncomeExpenseChart data={monthlyData} />
                </div>

                {/* Add Expense Form */}
                <div className="xl:col-span-1">
                    <ExpenseForm
                        categories={categories}
                        onSubmit={handleExpenseSubmit}
                    />
                </div>
            </div>

            {/* Expense Categories, Budget Tracking and Recent Transactions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {/* Expense Categories */}
                <CategoryPieChart categories={categories} />

                {/* Budget Management */}
                <BudgetTracker categories={categories} />

                {/* Recent Transactions */}
                <div className="md:col-span-2 lg:col-span-1">
                    <TransactionList transactions={recentTransactions} />
                </div>
            </div>
        </MainLayout>
    );
};

export default Dashboard;
