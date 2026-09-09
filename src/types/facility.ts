// Facility Types
export interface Facility {
  id: string;
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  ownerName?: string;
  logo?: string;
  timezone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FacilityCreateData {
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  ownerName?: string;
  timezone: string;
}

export interface FacilityUpdateData {
  name?: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  ownerName?: string;
  logo?: string;
  timezone?: string;
}

export interface FacilityStats {
  facilityId: string;
  totalUsers: number;
  activeUsers: number;
  totalDailyEntries: number;
  entriesThisMonth: number;
  averageDailyProduction: number;
}
