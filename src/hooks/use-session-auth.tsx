import { useState, useEffect, useCallback } from "react";
import * as auth from "../utils/auth";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLoginDate: string;
  createdAt: string;
}

interface UseSessionAuthProps {
  onLoginSuccess?: (user: User) => void;
  onLogoutSuccess?: () => void;
}

export const useSessionAuth = ({ onLoginSuccess, onLogoutSuccess }: UseSessionAuthProps = {}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already authenticated on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setLoading(true);
        const { user, isAuthenticated } = await auth.getCurrentUser();
        if (isAuthenticated && user) {
          setCurrentUser(user);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogin = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await auth.login({ email, password });
        setCurrentUser(response.user);
        onLoginSuccess?.(response.user);
        
        return response;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Login failed";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [onLoginSuccess]
  );

  const handleRegister = useCallback(
    async ({ 
      name, 
      email, 
      password, 
      role = "Student" 
    }: { 
      name: string; 
      email: string; 
      password: string; 
      role?: string; 
    }) => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await auth.register({ name, email, password, role });
        
        // After successful registration, automatically log the user in
        const loginResponse = await auth.login({ email, password });
        setCurrentUser(loginResponse.user);
        onLoginSuccess?.(loginResponse.user);
        
        return response;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Registration failed";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [onLoginSuccess]
  );

  const handleLogout = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      await auth.logout();
      setCurrentUser(null);
      onLogoutSuccess?.();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Logout failed";
      setError(errorMessage);
      console.error("Logout error:", err);
    } finally {
      setLoading(false);
    }
  }, [onLogoutSuccess]);

  const refreshUser = useCallback(async () => {
    try {
      const { user, isAuthenticated } = await auth.getCurrentUser();
      if (isAuthenticated && user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    } catch (err) {
      console.error("Failed to refresh user:", err);
      setCurrentUser(null);
    }
  }, []);

  return {
    currentUser,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    refreshUser,
    loading,
    error,
    isAuthenticated: !!currentUser,
  };
};
