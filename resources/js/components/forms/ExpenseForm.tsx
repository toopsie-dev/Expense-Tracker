import React, { ChangeEvent, FormEvent, useState } from "react";

interface Category {
    name: string;
    budget: number;
    spent: number;
    color: string;
}

interface ExpenseFormProps {
    categories: Category[];
    onSubmit: (data: ExpenseData) => void;
    title?: string;
}

export interface ExpenseData {
    description: string;
    amount: string;
    date: string;
    category: string;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
    categories,
    onSubmit,
    title = "Add Expense/Income",
}) => {
    const [formData, setFormData] = useState<ExpenseData>({
        description: "",
        amount: "",
        date: new Date().toISOString().substr(0, 10),
        category: "",
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        // Reset form
        setFormData({
            description: "",
            amount: "",
            date: new Date().toISOString().substr(0, 10),
            category: "",
        });
    };

    return (
        <div className="bg-gray-800 rounded-lg p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold mb-4">{title}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                        Description
                    </label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter description"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                        Amount
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-400 sm:text-sm">$</span>
                        </div>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            className="w-full pl-7 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="0.00"
                            step="0.01"
                            required
                        />
                    </div>
                    <p className="mt-1 text-xs text-gray-400">
                        Negative for expense, positive for income
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                            Date
                        </label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                            Category
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                        >
                            <option value="">Select a category</option>
                            <option value="Income">Income</option>
                            {categories.map((cat, idx) => (
                                <option key={idx} value={cat.name}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium rounded-md hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-300"
                >
                    Add Transaction
                </button>
            </form>
        </div>
    );
};

export default ExpenseForm;
