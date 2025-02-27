import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
    const isAuthenticated = localStorage.getItem("accessToken") !== null;

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
