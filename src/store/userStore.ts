import { create } from 'zustand';
import { User, UserListResponse } from '../types/user';

interface UserStoreState {
  users: User[];
  currentUser: User | null;
  total: number;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchUsers: (facilityId: string, page?: number, pageSize?: number) => Promise<void>;
  fetchUserById: (userId: string) => Promise<void>;
  createUser: (facilityId: string, userData: any) => Promise<void>;
  updateUser: (userId: string, userData: any) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  setUsers: (users: User[]) => void;
  setCurrentUser: (user: User | null) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  clearError: () => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
  users: [],
  currentUser: null,
  total: 0,
  isLoading: false,
  error: null,

  fetchUsers: async (facilityId: string, page = 1, pageSize = 10) => {
    try {
      set({ isLoading: true, error: null });
      // TODO: Replace with actual API call
      const response = await fetch(
        `/api/facilities/${facilityId}/users?page=${page}&pageSize=${pageSize}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data: UserListResponse = await response.json();
      set({
        users: data.users,
        total: data.total,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch users',
        isLoading: false,
      });
    }
  },

  fetchUserById: async (userId: string) => {
    try {
      set({ isLoading: true, error: null });
      // TODO: Replace with actual API call
      const response = await fetch(`/api/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }

      const user: User = await response.json();
      set({ currentUser: user, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch user',
        isLoading: false,
      });
    }
  },

  createUser: async (facilityId: string, userData: any) => {
    try {
      set({ isLoading: true, error: null });
      // TODO: Replace with actual API call
      const response = await fetch(`/api/facilities/${facilityId}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const newUser: User = await response.json();
      set((state) => ({
        users: [...state.users, newUser],
        total: state.total + 1,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to create user',
        isLoading: false,
      });
      throw error;
    }
  },

  updateUser: async (userId: string, userData: any) => {
    try {
      set({ isLoading: true, error: null });
      // TODO: Replace with actual API call
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const updatedUser: User = await response.json();
      set((state) => ({
        users: state.users.map((u) => (u.id === userId ? updatedUser : u)),
        currentUser: state.currentUser?.id === userId ? updatedUser : state.currentUser,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update user',
        isLoading: false,
      });
      throw error;
    }
  },

  deleteUser: async (userId: string) => {
    try {
      set({ isLoading: true, error: null });
      // TODO: Replace with actual API call
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      set((state) => ({
        users: state.users.filter((u) => u.id !== userId),
        total: state.total - 1,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to delete user',
        isLoading: false,
      });
      throw error;
    }
  },

  setUsers: (users) => set({ users }),
  setCurrentUser: (user) => set({ currentUser: user }),
  setError: (error) => set({ error }),
  setLoading: (loading) => set({ isLoading: loading }),
  clearError: () => set({ error: null }),
}));
