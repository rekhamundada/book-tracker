import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

@Injectable()
export class LogResponseInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`LogResponseInterceptor - ${req.url}`);
    return next.handle(req)
      .pipe(
        tap(event => {
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
}
