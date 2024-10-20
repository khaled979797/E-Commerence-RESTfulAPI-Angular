import { HttpInterceptorFn } from '@angular/common/http';
import { Inject, inject } from '@angular/core';
import { BusyService } from '../services/busy.service';
import { delay, finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(BusyService);
  if(!req.url.includes('EmailExists')){
    busyService.busy();
  }
  return next(req).pipe(delay(1000), finalize(() => busyService.idle()));
};
