import { NgModule, ErrorHandler } from '@angular/core';
import { DataService } from './data.service';
import { ErrorHandlerService } from './error-handler.service';
import { BookResolverService } from './books-resolver.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddHeaderInterceptor } from './add-header.interceptor';
import { LogResponseInterceptor } from './log-response.interceptor';
import { CacheService } from './http-cache.service';
import { CacheInterceptorService } from './cache.interceptor';
import { LoggerService } from './logger.service';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    DataService,
    LoggerService,
    ErrorHandlerService,
   // {provide: ErrorHandler, useClass: ErrorHandlerService },
    BookResolverService,
    CacheService,
    {provide: HTTP_INTERCEPTORS, useClass: AddHeaderInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: LogResponseInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS , useClass: CacheInterceptorService, multi: true}
  ]
})

export class CoreModule { }

