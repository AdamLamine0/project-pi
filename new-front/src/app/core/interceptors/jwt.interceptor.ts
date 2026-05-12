import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  const userId = authService.getUserId();
  const email = authService.getEmail();
  const role = authService.getRole();

  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          ...(userId ? { 'X-User-Id': String(userId) } : {}),
          ...(email ? { 'X-User-Email': email } : {}),
          ...(role ? { 'X-User-Role': role } : {}),
        },
      })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.logout();
      }

      return throwError(() => error);
    }),
  );
};
