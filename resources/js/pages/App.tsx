import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import QueryProvider from "../components/providers/QueryProvider";
import AppRoutes from "../routes/routes";

const App = () => {
    return (
        <QueryProvider>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryProvider>
    );
};

export default App;
