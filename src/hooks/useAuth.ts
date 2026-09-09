import { useAuthStore } from '../store/authStore';

/**
 * Custom hook to use authentication state and functions
 */
export function useAuth() {
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    register,
    setError,
    clearError,
  } = useAuthStore();

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    register,
    setError,
    clearError,
    isLoggedIn: isAuthenticated,
  };
}
