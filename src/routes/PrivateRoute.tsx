import { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import Loading from '../components/shared/Loading';

function PrivateRoute({ children }: { children: ReactNode }) {
    const { auth: { loading, logged } } = useAuth();
    if (loading) return <Loading />
    if (!logged) return <Navigate to={'/login'} />
    return children
}

export default PrivateRoute;