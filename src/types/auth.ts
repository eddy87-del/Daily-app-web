// User Roles
export enum UserRole {
  SUPER_USER = 'super_user',
  NORMAL_USER = 'normal_user',
}

// User Status
export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
  facilityId?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  facilityId: string;
  status: UserStatus;
  avatar?: string;
  lastLogin?: Date;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
  refreshToken?: string;
  expiresIn?: number;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  facilityId: string;
  role: UserRole;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
