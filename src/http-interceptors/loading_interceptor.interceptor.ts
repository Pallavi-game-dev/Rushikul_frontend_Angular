import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoadingAnimationService } from '../app/services/utility/loadingAnimation/loading-animation.service';
import { LoginServiceService } from 'src/app/services/api/login-service.service';
import { ServiceFactoryService } from 'src/app/services/factory/service-factory.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingAnimationService,
    private serviceFactory: ServiceFactoryService,
    private loginService: LoginServiceService,) { console.log("Injection"); }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request_method = req.method ?? 'GET'
    let custom_message = req.headers.get('custom_message') ?? null
    this.loadingService.showLoading(request_method, custom_message);

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 401) {
          this.loginService.logout(null, error.statusText);
        } else if (error.status == 422) {
          this.serviceFactory.notification('Unprocessable Content', false);
        } else if (error.status == 400) {
          this.serviceFactory.notification(error.error.message, false);
        } else {
          this.serviceFactory.notification(
            "We're sorry, but something went wrong on our end. Please try again later.",
            false
          );
        }
        return throwError(error);
      }),
      finalize(() => this.loadingService.hideLoading())
    );
  }
}
