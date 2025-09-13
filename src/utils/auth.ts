import { baseUrl, headers, processServerRequest } from "./api";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

interface LoginResponse {
  message: string;
  user: any;
  isAuthenticated: boolean;
}

interface RegisterResponse {
  message: string;
  user: any;
}

interface AuthError {
  error: string;
  details?: string;
}

const login = async ({ email, password }: { email: string; password: string }): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Important for session cookies
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error: AuthError = await response.json();
    throw new Error(error.error || "Login failed");
  }

  return response.json();
};

const register = async ({ 
  name, 
  email, 
  password, 
  role = "Student" 
}: { 
  name: string; 
  email: string; 
  password: string; 
  role?: string; 
}): Promise<RegisterResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ name, email, password, role }),
  });

  if (!response.ok) {
    const error: AuthError = await response.json();
    throw new Error(error.error || "Registration failed");
  }

  return response.json();
};

const logout = async (): Promise<{ message: string }> => {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const error: AuthError = await response.json();
    throw new Error(error.error || "Logout failed");
  }

  return response.json();
};

const getCurrentUser = async (): Promise<{ user: any; isAuthenticated: boolean }> => {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    if (response.status === 401) {
      return { user: null, isAuthenticated: false };
    }
    const error: AuthError = await response.json();
    throw new Error(error.error || "Failed to get current user");
  }

  return response.json();
};

export { login, register, logout, getCurrentUser };
