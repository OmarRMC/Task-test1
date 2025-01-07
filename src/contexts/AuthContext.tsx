
import { createContext, ReactNode, useEffect, useState } from "react";
import { getUserFromToken } from "../api/authApi";
import { authContextInterface, userAuthInterface } from "../types/auth";

export const AuthContext = createContext<authContextInterface | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [auth, setAuth] = useState<userAuthInterface>({
        logged: false,
        loading: true,
    });
    useEffect(() => {
        getUserFromToken()
            .then((data) => setAuth((auth) => ({ ...auth, user: data, logged: true })))
            .finally(() => setAuth((auth) => ({ ...auth, loading: false })));
    }, []);
    return (
        <AuthContext.Provider value={{ auth }}>{children}</AuthContext.Provider>
    );
}

