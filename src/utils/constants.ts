// Role constants
export const ROLES = {
  SUPER_USER: 'super_user',
  NORMAL_USER: 'normal_user',
} as const;

// User status constants
export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
} as const;

// Quality levels
export const QUALITY_LEVELS = ['excellent', 'good', 'fair', 'poor'] as const;

// Period types
export const PERIODS = ['day', 'week', 'month', 'year'] as const;

// Permissions by role
export const PERMISSIONS = {
  [ROLES.SUPER_USER]: [
    'manage_users',
    'manage_facility',
    'view_all_entries',
    'delete_entries',
    'export_data',
    'manage_settings',
    'view_analytics',
  ],
  [ROLES.NORMAL_USER]: [
    'create_entry',
    'view_own_entries',
    'view_facility_analytics',
    'manage_own_profile',
  ],
} as const;
