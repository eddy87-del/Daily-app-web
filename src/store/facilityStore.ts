import { create } from 'zustand';
import { Facility, FacilityStats } from '../types/facility';

interface FacilityStoreState {
  facility: Facility | null;
  facilities: Facility[];
  stats: FacilityStats | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchFacility: (facilityId: string) => Promise<void>;
  fetchFacilities: () => Promise<void>;
  fetchStats: (facilityId: string) => Promise<void>;
  createFacility: (data: any) => Promise<void>;
  updateFacility: (facilityId: string, data: any) => Promise<void>;
  setFacility: (facility: Facility | null) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useFacilityStore = create<FacilityStoreState>((set) => ({
  facility: null,
  facilities: [],
  stats: null,
  isLoading: false,
  error: null,

  fetchFacility: async (facilityId: string) => {
    try {
      set({ isLoading: true, error: null });
      // TODO: Replace with actual API call
      const response = await fetch(`/api/facilities/${facilityId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch facility');
      }

      const facility: Facility = await response.json();
      set({ facility, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch facility',
        isLoading: false,
      });
    }
  },

  fetchFacilities: async () => {
    try {
      set({ isLoading: true, error: null });
      // TODO: Replace with actual API call
      const response = await fetch('/api/facilities', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch facilities');
      }

      const facilities: Facility[] = await response.json();
      set({ facilities, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch facilities',
        isLoading: false,
      });
    }
  },

  fetchStats: async (facilityId: string) => {
    try {
      set({ isLoading: true, error: null });
      // TODO: Replace with actual API call
      const response = await fetch(`/api/facilities/${facilityId}/stats`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch facility stats');
      }

      const stats: FacilityStats = await response.json();
      set({ stats, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch facility stats',
        isLoading: false,
      });
    }
  },

  createFacility: async (data: any) => {
    try {
      set({ isLoading: true, error: null });
      // TODO: Replace with actual API call
      const response = await fetch('/api/facilities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create facility');
      }

      const facility: Facility = await response.json();
      set((state) => ({
        facilities: [...state.facilities, facility],
        facility,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to create facility',
        isLoading: false,
      });
      throw error;
    }
  },

  updateFacility: async (facilityId: string, data: any) => {
    try {
      set({ isLoading: true, error: null });
      // TODO: Replace with actual API call
      const response = await fetch(`/api/facilities/${facilityId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update facility');
      }

      const facility: Facility = await response.json();
      set((state) => ({
        facilities: state.facilities.map((f) => (f.id === facilityId ? facility : f)),
        facility: state.facility?.id === facilityId ? facility : state.facility,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update facility',
        isLoading: false,
      });
      throw error;
    }
  },

  setFacility: (facility) => set({ facility }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));
