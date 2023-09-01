import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { TokenApiModel } from '../models/token.api.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService, 
    private toast: NgToastService,
    private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const myToken = this.auth.getToken();  //get token
    //append the token to the header
    if(myToken){
      //set the token value
      request  = request.clone({
        setHeaders: {Authorization: `Bearer ${myToken}`}
      })
    }

    //return next.handle(request); //send the request back

    //Handling error with the request
    return next.handle(request).pipe(
      catchError((err:any) => {
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            // this.toast.warning({detail: "Warning", summary: "User timed out, please login"});
            // this.router.navigate(['login']);
             return this.handleUnAuthorizedError(request, next)
          }
        }
        return throwError(()=>
        new Error("Something went wrong"))
      })
    );
  }

  //handling unathorized request
  handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler)
  {
    let tokenApiModel = new TokenApiModel();
    tokenApiModel.accessToken = this.auth.getToken() || '';
    tokenApiModel.refreshToken = this.auth.getRefreshToken() || '';
    return this.auth.renewToken(tokenApiModel)
    .pipe(
      switchMap((data:TokenApiModel)=> {
        this.auth.storeRefreshToken(data.refreshToken);
        this.auth.storeToken(data.accessToken);
        req = req.clone({
          setHeaders:{Authorization: `Bearer ${data.accessToken}`}
        })
        return next.handle(req)
      }),
      catchError((err)=>{
        return throwError(()=>{
          this.toast.warning({
            detail: "warning", summary: "Token expired",
            type: 'warning'
          });
          this.router.navigate(['login'])
        })
      })
    )
  }
}
