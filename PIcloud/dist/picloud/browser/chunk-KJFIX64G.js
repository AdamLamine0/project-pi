import {
  AuthService,
  Router,
  inject
} from "./chunk-HBGQ7VAX.js";

// src/app/core/services/auth.guard.ts
var authGuard = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (!authService.isLoggedIn()) {
    router.navigate(["/auth/login"]);
    return false;
  }
  const requiredRole = route.data["role"];
  const requiredRoles = route.data["roles"];
  if (requiredRoles) {
    if (!requiredRoles.includes(authService.getRole())) {
      router.navigate(["/events"]);
      return false;
    }
  } else if (requiredRole) {
    if (authService.getRole() !== requiredRole) {
      router.navigate(["/events"]);
      return false;
    }
  }
  return true;
};

export {
  authGuard
};
//# sourceMappingURL=chunk-KJFIX64G.js.map
