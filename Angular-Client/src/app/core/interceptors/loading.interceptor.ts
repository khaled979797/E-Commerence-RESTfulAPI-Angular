import { HttpInterceptorFn } from '@angular/common/http';
import { Inject, inject } from '@angular/core';
import { BusyService } from '../services/busy.service';
import { delay, finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(BusyService);
  if(req.method === 'POST' && req.url.includes('CreateOrder')){
    return next(req);
  }

  if(req.method === 'DELETE'){
    return next(req);
  }

  if(req.url.includes('EmailExists')){
    return next(req);
  }

  busyService.busy();
  return next(req).pipe(finalize(() => busyService.idle()));
};
