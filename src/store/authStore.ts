import { create } from 'zustand';
import { AuthState, AuthUser } from '../types/auth';

interface AuthStoreState extends AuthState {
  login: (email: string, password: string, facilityId?: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string, facilityId: string) => Promise<void>;
  setUser: (user: AuthUser | null) => void;
  setToken: (token: string | null) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  clearError: () => void;
  refreshToken: () => Promise<void>;
}

// Initial state from localStorage
const getInitialState = () => {
  const storedUser = localStorage.getItem('auth_user');
  const storedToken = localStorage.getItem('auth_token');
  return {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
    isAuthenticated: !!storedToken,
    isLoading: false,
    error: null,
  };
};

export const useAuthStore = create<AuthStoreState>((set) => ({
  ...getInitialState(),

  login: async (email: string, password: string, facilityId?: string) => {
    try {
      set({ isLoading: true, error: null });
      // TODO: Replace with actual API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, facilityId }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
      });

      // Store in localStorage
      localStorage.setItem('auth_user', JSON.stringify(data.user));
      localStorage.setItem('auth_token', data.token);
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Login failed',
        isLoading: false,
      });
      throw error;
    }
  },

  logout: () => {
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
  },

  register: async (email: string, password: string, name: string, facilityId: string) => {
    try {
      set({ isLoading: true, error: null });
      // TODO: Replace with actual API call
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, facilityId }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
      });

      localStorage.setItem('auth_user', JSON.stringify(data.user));
      localStorage.setItem('auth_token', data.token);
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Registration failed',
        isLoading: false,
      });
      throw error;
    }
  },

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  setToken: (token) => {
    set({ token, isAuthenticated: !!token });
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  },

  setError: (error) => set({ error }),

  setLoading: (isLoading) => set({ isLoading }),

  clearError: () => set({ error: null }),

  refreshToken: async () => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const data = await response.json();
      set({ token: data.token });
      localStorage.setItem('auth_token', data.token);
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Token refresh failed',
        user: null,
        token: null,
        isAuthenticated: false,
      });
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_token');
    }
  },
}));
