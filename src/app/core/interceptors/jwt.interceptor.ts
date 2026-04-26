import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token =authService.getToken();
  console.log("TOKEN =", token);
  // hedhi 3malnah bch taddi toekn automatiquement
   const authReq = token

  const token = authService.getToken();

  const authReq = token

    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Only redirect to login on 401 when a token existed (expired/invalid session).
      // If there was no token the request was anonymous — let the error propagate silently.
      if (error.status === 401 && token) {
        authService.logout();
        router.navigate(['/auth/login']);
      }

      return throwError(() => error);
    }),
  );
};
