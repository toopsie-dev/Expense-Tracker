import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import api from "../../services/api";

// Define the validation schema with Zod
const signupSchema = z
    .object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                "Password must contain at least one uppercase letter, one lowercase letter, and one number"
            ),
        password_confirmation: z.string(),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Passwords don't match",
        path: ["password_confirmation"],
    });

type SignupFormData = z.infer<typeof signupSchema>;

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data: SignupFormData) => {
        try {
            const response = await api.post("register", data);
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                navigate("/");
            }
        } catch (error: any) {
            if (error.response?.data?.errors) {
                // Handle server-side validation errors
                Object.entries(error.response.data.errors).forEach(
                    ([key, value]) => {
                        setError(key as keyof SignupFormData, {
                            type: "server",
                            message: Array.isArray(value)
                                ? value[0]
                                : String(value),
                        });
                    }
                );
            } else {
                setError("root", {
                    type: "server",
                    message: "An unexpected error occurred. Please try again.",
                });
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 px-4 select-none">
            <div className="max-w-md w-full mx-auto">
                <div className="flex justify-center">
                    <div className="w-12 h-12 select-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-full w-full text-gray-400 select-none"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="bg-gray-800 shadow-xl rounded-lg p-6">
                        {errors.root && (
                            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-md">
                                <p className="text-sm text-red-400">
                                    {errors.root.message}
                                </p>
                            </div>
                        )}

                        <form
                            className="space-y-4"
                            onSubmit={handleSubmit(onSubmit)}
                            noValidate
                        >
                            {/* Name Field */}
                            <div>
                                <input
                                    {...register("name")}
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:border-gray-500 select-text"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-400 select-none">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            {/* Email Field */}
                            <div>
                                <input
                                    {...register("email")}
                                    type="email"
                                    placeholder="Email ID"
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:border-gray-500 select-text"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-400 select-none">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <input
                                    {...register("password")}
                                    type="password"
                                    placeholder="Password"
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:border-gray-500 select-text"
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-400 select-none">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password Field */}
                            <div>
                                <input
                                    {...register("password_confirmation")}
                                    type="password"
                                    placeholder="Confirm Password"
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:border-gray-500 select-text"
                                />
                                {errors.password_confirmation && (
                                    <p className="mt-1 text-sm text-red-400 select-none">
                                        {errors.password_confirmation.message}
                                    </p>
                                )}
                            </div>

                            <div className="mt-6">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 select-none"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center select-none">
                                            <svg
                                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white select-none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Creating account...
                                        </span>
                                    ) : (
                                        "SIGN UP"
                                    )}
                                </button>
                            </div>
                        </form>

                        <div className="mt-4 text-center select-none">
                            <p className="text-sm text-gray-400">
                                Already have an account?{" "}
                                <button
                                    onClick={() => navigate("/login")}
                                    className="text-gray-300 hover:text-white font-medium"
                                >
                                    Login
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
