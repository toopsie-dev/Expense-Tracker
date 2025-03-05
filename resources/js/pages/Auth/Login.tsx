import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import api from "../../services/api";

// Define the validation schema with Zod
const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            const response = await api.post("login", data);

            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
                navigate("/dashboard");
            }
        } catch (error: any) {
            console.error("Login error:", error);

            if (error.response) {
                const status = error.response.status;
                const message =
                    error.response?.data?.message || "Invalid credentials";

                if (status === 403) {
                    console.error(
                        "CSRF token issue. Check network tab for details."
                    );
                    setError("root", {
                        type: "manual",
                        message: "Authentication error: CSRF token mismatch.",
                    });
                } else if (status === 401) {
                    setError("root", {
                        type: "manual",
                        message: message,
                    });
                } else {
                    setError("root", {
                        type: "manual",
                        message: `Error: ${message}`,
                    });
                }
            } else {
                setError("root", {
                    type: "manual",
                    message: "Network error. Please try again later.",
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
                            <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                            />
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

                            {/* Forgot Password Link */}
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => navigate("/forgot-password")}
                                    className="text-sm text-gray-400 hover:text-gray-300"
                                >
                                    Forgot Password?
                                </button>
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
                                            Signing in...
                                        </span>
                                    ) : (
                                        "LOGIN"
                                    )}
                                </button>
                            </div>
                        </form>

                        <div className="mt-4 text-center select-none">
                            <p className="text-sm text-gray-400">
                                Don't have an account?{" "}
                                <button
                                    onClick={() => navigate("/signup")}
                                    className="text-gray-300 hover:text-white font-medium"
                                >
                                    Sign up
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
