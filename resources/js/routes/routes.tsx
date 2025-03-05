import React from "react";
import { Navigate, Route, Routes as Router } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import Dashboard from "../pages/views/Dashboard";

const AppRoutes = () => {
    return (
        <Router>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Router>
    );
};

export default AppRoutes;
