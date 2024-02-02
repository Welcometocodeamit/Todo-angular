import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  token:string = null

  constructor() {

    if(localStorage.getItem('token') == null){
      localStorage.setItem('token', JSON.stringify(this.token))
    }else{
      this.token=JSON.parse(localStorage.getItem('token'))
    }

  }

  getToken(){
    this.token=JSON.parse(localStorage.getItem('token'))
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let modifiedRequest;
    this.getToken()
    if(this.token != null){
      modifiedRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${this.token}`).set('Content-Type', 'application/json'),
      });

      // console.log(modifiedRequest)
      return next.handle(modifiedRequest);
    }

    

    // console.log(request)
    return next.handle(request);
  }
}
