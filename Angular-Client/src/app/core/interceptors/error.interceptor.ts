import {HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject} from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error) {
        if (error.status === 400) {
          toastr.error(error.error.message, error.status.toString())
          throw error.error;
        }
        if (error.status === 401) {
          toastr.error(error.error.message, error.status.toString())
        }
        if (error.status === 404) {
          toastr.warning(error.error.message, error.status.toString())
          router.navigateByUrl('/not-found');
        };
        if (error.status === 500) {
          toastr.error(error.error.message, error.status.toString())
          const navigationExtras: NavigationExtras = {state: {error: error.error}};
          router.navigateByUrl('/server-error', navigationExtras);
        }
      }
      return throwError(() => new Error(error.message))
    })
  )
};
