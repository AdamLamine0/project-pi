import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { UserRole } from '../models/user.model';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/auth/login']);
    return false;
  }

  const requiredRole = route.data['role'] as UserRole | undefined;
  const requiredRoles = route.data['roles'] as UserRole[] | undefined;

  if (requiredRoles && !authService.hasRole(...requiredRoles)) {
    router.navigate(['/']);
    return false;
  }

  if (requiredRole && !authService.hasRole(requiredRole)) {
    router.navigate(['/']);
    return false;
  }

  return true;
};

/** Allows only ADMIN, MENTOR, PARTNER, PARTENAIRE — regular USERs go back to front. */
export const dashboardGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/auth/login']);
    return false;
  }

  const dashboardRoles: UserRole[] = ['ADMIN', 'MENTOR', 'PARTNER', 'PARTENAIRE'];
  if (!authService.hasRole(...dashboardRoles)) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
