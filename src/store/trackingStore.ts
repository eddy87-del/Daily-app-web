import { create } from 'zustand';
import { MilkEntry, TrackingStats } from '../types/tracking';

interface TrackingStoreState {
  entries: MilkEntry[];
  currentEntry: MilkEntry | null;
  stats: TrackingStats | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchEntries: (facilityId: string, date?: Date) => Promise<void>;
  fetchStats: (facilityId: string, period: 'day' | 'week' | 'month' | 'year') => Promise<void>;
  createEntry: (facilityId: string, data: any) => Promise<void>;
  updateEntry: (entryId: string, data: any) => Promise<void>;
  deleteEntry: (entryId: string) => Promise<void>;
  setEntries: (entries: MilkEntry[]) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useTrackingStore = create<TrackingStoreState>((set) => ({
  entries: [],
  currentEntry: null,
  stats: null,
  isLoading: false,
  error: null,

  fetchEntries: async (facilityId: string, date?: Date) => {
    try {
      set({ isLoading: true, error: null });
      const params = new URLSearchParams();
      if (date) {
        params.append('date', date.toISOString().split('T')[0]);
      }
      
      // TODO: Replace with actual API call
      const response = await fetch(
        `/api/facilities/${facilityId}/entries?${params.toString()}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch entries');
      }

      const entries: MilkEntry[] = await response.json();
      set({ entries, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch entries',
        isLoading: false,
      });
    }
  },

  fetchStats: async (facilityId: string, period: 'day' | 'week' | 'month' | 'year') => {
    try {
      set({ isLoading: true, error: null });
      // TODO: Replace with actual API call
      const response = await fetch(
        `/api/facilities/${facilityId}/stats?period=${period}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }

      const stats: TrackingStats = await response.json();
      set({ stats, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch stats',
        isLoading: false,
      });
    }
  },

  createEntry: async (facilityId: string, data: any) => {
    try {
      set({ isLoading: true, error: null });
      // TODO: Replace with actual API call
      const response = await fetch(`/api/facilities/${facilityId}/entries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create entry');
      }

      const entry: MilkEntry = await response.json();
      set((state) => ({
        entries: [...state.entries, entry],
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to create entry',
        isLoading: false,
      });
      throw error;
    }
  },

  updateEntry: async (entryId: string, data: any) => {
    try {
      set({ isLoading: true, error: null });
      // TODO: Replace with actual API call
      const response = await fetch(`/api/entries/${entryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update entry');
      }

      const entry: MilkEntry = await response.json();
      set((state) => ({
        entries: state.entries.map((e) => (e.id === entryId ? entry : e)),
        currentEntry: state.currentEntry?.id === entryId ? entry : state.currentEntry,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update entry',
        isLoading: false,
      });
      throw error;
    }
  },

  deleteEntry: async (entryId: string) => {
    try {
      set({ isLoading: true, error: null });
      // TODO: Replace with actual API call
      const response = await fetch(`/api/entries/${entryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete entry');
      }

      set((state) => ({
        entries: state.entries.filter((e) => e.id !== entryId),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to delete entry',
        isLoading: false,
      });
      throw error;
    }
  },

  setEntries: (entries) => set({ entries }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));
