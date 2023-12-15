import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private _authS: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.headers.has('Content-Type'))
      req = req.clone({
        headers: req.headers.set('Content-Type', 'application/json'),
      });

    req = req.clone({
      headers: req.headers.append(
        'Authorization',
        'Basic ' + this._authS.getCredentials()
      ),
    });

    return next.handle(req);
  }
}
