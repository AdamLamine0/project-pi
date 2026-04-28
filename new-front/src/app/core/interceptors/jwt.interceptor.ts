import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();
  const isPublicExpertList = req.url.includes('/api/users/experts');
  const isAuthEndpoint = req.url.includes('/api/auth/');
  const isPublicRequest = isPublicExpertList || isAuthEndpoint;

  const authReq = token && !isPublicRequest
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !isPublicRequest) {
        authService.logout();
        router.navigate(['/auth/login']);
      }

      return throwError(() => error);
    }),
  );
};
