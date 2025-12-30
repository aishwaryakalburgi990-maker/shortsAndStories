import { useState, useEffect } from 'react';
import { useApi, useMutation } from './useApi';
import { authApi, authUtils, AuthUser } from '../services/api';

// Hook for authentication state
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(authUtils.isAuthenticated());
  const [user, setUser] = useState<AuthUser | null>(null);

  // Get user profile if authenticated
  const { data: profileData, loading: profileLoading, error: profileError } = useApi(
    () => authApi.getProfile(),
    [isAuthenticated]
  );

  useEffect(() => {
    if (profileData) {
      setUser(profileData.user);
    }
  }, [profileData]);

  // Login mutation
  const loginMutation = useMutation(({ email, password }: { email: string; password: string }) =>
    authApi.login(email, password)
  );

  // Logout mutation
  const logoutMutation = useMutation(() => authApi.logout());

  const login = async (email: string, password: string) => {
    const result = await loginMutation.mutate({ email, password });
    if (result) {
      authUtils.setToken(result.token);
      setUser(result.user);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = async () => {
    await logoutMutation.mutate(undefined);
    authUtils.removeToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    user,
    loading: profileLoading,
    error: profileError || loginMutation.error || logoutMutation.error,
    login,
    logout,
    loginLoading: loginMutation.loading,
    logoutLoading: logoutMutation.loading,
  };
}