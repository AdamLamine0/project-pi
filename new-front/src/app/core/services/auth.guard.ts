import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { UserRole } from '../models/user.model';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/auth/login']);
    return false;
  }

  // Regular users belong on the public site, not the dashboard.
  if (authService.hasRole('USER')) {
    router.navigate(['/']);
    return false;
  }

  const requiredRole = route.data['role'] as UserRole | undefined;
  const requiredRoles = route.data['roles'] as UserRole[] | undefined;

  if (requiredRoles && !authService.hasRole(...requiredRoles)) {
    if (route.routeConfig?.path === 'dashboard') {
      router.navigate(['/']);
      return false;
    }

    if (route.routeConfig?.path === 'legal') {
      router.navigateByUrl(state.url.replace(/^\/app\/legal/, '/procedures'));
      return false;
    }

    router.navigate([authService.getPostAuthRedirectPath()]);
    return false;
  }

  if (requiredRole && !authService.hasRole(requiredRole)) {
    if (route.routeConfig?.path === 'dashboard') {
      router.navigate(['/']);
      return false;
    }

    if (route.routeConfig?.path === 'legal') {
      router.navigateByUrl(state.url.replace(/^\/app\/legal/, '/procedures'));
      return false;
    }

    router.navigate([authService.getPostAuthRedirectPath()]);
    return false;
  }

  return true;
};
