// Tracking Types
export interface MilkEntry {
  id: string;
  facilityId: string;
  userId: string;
  date: Date;
  quantity: number; // in liters
  quality: 'excellent' | 'good' | 'fair' | 'poor';
  temperature?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MilkEntryCreateData {
  date: Date;
  quantity: number;
  quality: 'excellent' | 'good' | 'fair' | 'poor';
  temperature?: number;
  notes?: string;
}

export interface DailyStatistics {
  date: Date;
  totalQuantity: number;
  averageQuality: string;
  entriesCount: number;
  averageTemperature?: number;
}

export interface TrackingStats {
  facilityId: string;
  period: 'day' | 'week' | 'month' | 'year';
  data: DailyStatistics[];
  totalProduction: number;
  averageDaily: number;
}
