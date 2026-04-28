import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/auth/login']);
    return false;
  }

  const requiredRole = route.data['role'];       
  const requiredRoles = route.data['roles'];     

  if (requiredRoles) {
    if (!requiredRoles.includes(authService.getRole())) {
      router.navigate(['/events']);
      return false;
    }
  } else if (requiredRole) {
    if (authService.getRole() !== requiredRole) {
      router.navigate(['/events']);
      return false;
    }
  }

  return true;
};