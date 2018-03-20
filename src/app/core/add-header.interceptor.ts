import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`AddHeaderInterceptor - ${req.url}`);
    // http requests are immutable so make copy
    let jsonReq: HttpRequest<any> = req.clone({
        setHeaders: {'Content-Type': 'application/json'}
    });
    return next.handle(jsonReq);
  }
}
