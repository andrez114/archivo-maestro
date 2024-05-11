import { Mensaje } from './../models/mensaje';
import { tap, map, catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../services';
import { ToasterService } from 'angular2-toaster';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private mensaje: Mensaje;
  constructor(public auth: AuthenticationService, private toastService: ToasterService) {
    this.mensaje = new Mensaje(toastService);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const token = sessionStorage.getItem('token');
    if (request.url !== environment.STATIC.webbridge && (currentUser && token)) {
      request = request.clone({
        setHeaders: {
          Authorization: `${token}`,
        },
      });
    }
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        let data: any = {};
        if (!error.error.meta) {
          data = {
            meta: { status: 'ERROR', count: 1 },
            data: { devMessage: error.message, errorCode: error.status, userMessage: error.message },
          };
          return throwError(data);
        }
        return throwError(error.error);
      })
    );
  }
}
