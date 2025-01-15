import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceFactoryService } from 'src/app/services/factory/serviceFactory.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  errorData: any;
  url;
  private cache = new Map<string, HttpResponse<any>>();

  constructor(
    private loginService: AuthService,
    private router: Router,
    private serviceFactory:ServiceFactoryService
  ) {
    this.url = this.router.url;
  }

  intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    //

    if (this.loginService.checkIsLoggin()) {
      const authToken = this.loginService.getToken();
      req = req.clone({
        setHeaders: {
          Authorization: authToken,
          url: this.url,
        },
      });
    }
    this.url = this.router.url;

    // const cachedResponse = this.cache.get(req.url);

    // if (cachedResponse) {
    //   return of(cachedResponse);
    // }
    return next.handle(req).pipe(

      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.ok && event.body.message == 'Invalid Token...') {
          }
        }
        return event;
      }),

      catchError((error: HttpErrorResponse) => {
        if (error.status == 401) {
          this.loginService.logout(this.url, error.statusText);
        } else if (error.status == 422) {
          this.serviceFactory.notification('Unprocessable Content', false);
          setTimeout(function () {}, 2000);
        } else if (error.status == 400) {
          this.serviceFactory.notification(error.error.message, false);
          setTimeout(function () {}, 2000);
        } else {
          this.serviceFactory.notification(
            "We're sorry, but something went wrong on our end. Please try again later.",
            false
          );
        }

        return throwError(this.errorData);
      })
    );
  }
}
