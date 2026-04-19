import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Not logged in → redirect to login
  if (!authService.isLoggedIn()) {
    router.navigate(['/auth/login']);
    return false;
  }

  // Check role(s) if route requires it
  const requiredRole = route.data['role'];
  const requiredRoles = route.data['roles'];   // array of allowed roles

  if (requiredRoles) {
    if (!requiredRoles.includes(authService.getRole())) {
      router.navigate(['/events']);
      return false;
    }
  } else if (requiredRole) {
    if (authService.getRole() !== requiredRole) {
      // logged in but wrong role → redirect to profile  
      router.navigate(['/user/profile']);
      return false;
    }
  }

  return true;
};