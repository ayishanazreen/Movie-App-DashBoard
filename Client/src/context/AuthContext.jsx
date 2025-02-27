import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        const token= localStorage.getItem("token");
        if(token){
            setAuth(true);
        }
        else{
            setAuth(false)
        }
    }, []);

    const login = (token) => {
        setAuth(true);
        localStorage.setItem("token", token)
    };

    const logout = () => {
        setAuth(false);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
