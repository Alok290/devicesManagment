import React, { createContext, useState, useContext, useEffect } from 'react';
import StorageService from '../services/storageService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(null); // 'manager' or 'team_member'
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Load auth state from storage on mount
    useEffect(() => {
        loadAuthState();
    }, []);

    const loadAuthState = async () => {
        try {
            const authData = await StorageService.getAuth();
            if (authData) {
                setUserRole(authData.userRole);
                setIsAuthenticated(authData.isAuthenticated);
            }
        } catch (error) {
            console.error('Error loading auth state:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (role) => {
        setUserRole(role);
        setIsAuthenticated(true);
        // Persist auth state
        await StorageService.saveAuth({ userRole: role, isAuthenticated: true });
    };

    const logout = async () => {
        setUserRole(null);
        setIsAuthenticated(false);
        // Clear auth state
        await StorageService.clearAuth();
    };

    return (
        <AuthContext.Provider value={{ userRole, isAuthenticated, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
