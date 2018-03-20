import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest , HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CacheService } from './http-cache.service';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class CacheInterceptorService {

  constructor(private cacheService: CacheService ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // pass along  non-cacheble requests and Invalidate cache
    if (req.method !== 'GET') {
    console.log(`Invalidating Cache: ${req.method} ${req.url}`);
    this.cacheService.invalidateCache();
      return next.handle(req);
    }
    // attempt to retrieve a cached Response
    const cachedResponse: HttpResponse<any> = this.cacheService.get(req.url);
    // return a cached response
    if (cachedResponse) {
      console.log(`Returning a Cached Response: ${cachedResponse.url}`);
      console.log(cachedResponse);
      return of(cachedResponse);
    }
    // send request to the server and add to the cache
    return next.handle(req)
    .pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          console.log(`Adding item to the Cache: ${req.url}`);
          this.cacheService.put(req.url, event);
        }
      })
    );
  }
}
