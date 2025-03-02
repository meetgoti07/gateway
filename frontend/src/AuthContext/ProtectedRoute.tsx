
import {useAuth} from "@/AuthContext/AuthContext.tsx";
import { Navigate } from "react-router-dom";
import {JSX} from "react";

interface ProtectedRouteProps {
    component: JSX.Element; // Type component as a JSX element
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Show a loading state until auth status is determined
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />; // Redirect to login if not authenticated
    }

    return component; // Render protected route component if authenticated
};

export default ProtectedRoute;
