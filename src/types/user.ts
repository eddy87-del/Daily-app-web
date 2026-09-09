// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  facilityId: string;
  role: 'super_user' | 'normal_user';
  status: 'active' | 'inactive' | 'suspended';
  avatar?: string;
  phone?: string;
  joinedAt: Date;
  lastLogin?: Date;
}

export interface UserCreateData {
  email: string;
  name: string;
  password: string;
  role: 'super_user' | 'normal_user';
  phone?: string;
}

export interface UserUpdateData {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  status?: 'active' | 'inactive' | 'suspended';
}

export interface UserListResponse {
  users: User[];
  total: number;
  page: number;
  pageSize: number;
}
