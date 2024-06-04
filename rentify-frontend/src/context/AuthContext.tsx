import React, { createContext, useState, useEffect, useContext } from 'react';
import { getUser } from '../services/api';
import { IUser } from '../models';


interface AuthContextProps {
    user: IUser | null;
    loading: boolean;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    fetchUser: () => Promise<void>,
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    loading: false,
    login: () => { },
    logout: () => { },
    isAuthenticated: false,
    fetchUser: async () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    const fetchUser = async () => {
        try {
            setLoading(true);
            const user = await getUser()
            setUser(user);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchUser();
        };
    }, [token]);

    const login = (token: string) => {
        localStorage.setItem('token', token);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, fetchUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
