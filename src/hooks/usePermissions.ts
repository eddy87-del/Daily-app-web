import { useAuthStore } from '../store/authStore';
import { PERMISSIONS, ROLES } from '../utils/constants';

/**
 * Check if the current user has a specific permission
 */
export function useHasPermission(permission: string): boolean {
  const user = useAuthStore((state) => state.user);
  
  if (!user) return false;
  
  const rolePermissions = PERMISSIONS[user.role as keyof typeof PERMISSIONS] || [];
  return rolePermissions.includes(permission);
}

/**
 * Check if the current user is a super user
 */
export function useIsSuperUser(): boolean {
  const user = useAuthStore((state) => state.user);
  return user?.role === ROLES.SUPER_USER;
}

/**
 * Check if the current user is a normal user
 */
export function useIsNormalUser(): boolean {
  const user = useAuthStore((state) => state.user);
  return user?.role === ROLES.NORMAL_USER;
}

/**
 * Check if user has multiple permissions
 */
export function useHasAllPermissions(permissions: string[]): boolean {
  return permissions.every((permission) => useHasPermission(permission));
}

/**
 * Check if user has at least one of the permissions
 */
export function useHasAnyPermission(permissions: string[]): boolean {
  return permissions.some((permission) => useHasPermission(permission));
}
