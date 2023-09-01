import { Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http';
import { Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt'
import { TokenApiModel } from 'src/app/models/token.api.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //create url => we can get it from swagger
  private baseUrl:string = "https://localhost:7230/api/User/";
  private userPayload:any; //initiate payload for token decoding

  constructor(
    private http: HttpClient, 
    private router: Router) {
      this.userPayload = this.decodeToken(); //pass decoded token to user payload
     }


  //register object and type any
  signup(userObj:any){
    return this.http.post<any>(`${this.baseUrl}register`, userObj);
  }

  //login object and type any
  login(loginObj: any){
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj);
  }

  //store token 
  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }

  //strore refresh token 
  storeRefreshToken(tokenValue: string){
    localStorage.setItem('refreshToken', tokenValue)
  }

  

  //get token
  getToken()
  {
    return localStorage.getItem('token')
  }

  //get refresh token
  getRefreshToken()
  {
    return localStorage.getItem('refreshToken')
  }

  //check if user is logged in
  isLoggedIn():boolean{
    return !!localStorage.getItem('token'); //convert string to boolean
  }

  //logout function

  singOut(){
    localStorage.clear();
    this.router.navigate(['login'])
    //return localStorage.removeItem("token");

  }

  decodeToken(){
    const jwtHelper = new JwtHelperService();

    const token = this.getToken()!; //we pass exclamation mark because it can be undefined
    return jwtHelper.decodeToken(token);
  }

  getfullnameFromToken(){
    if(this.userPayload)
    return this.userPayload.unique_name;
  }

  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }

  renewToken(tokenApi: TokenApiModel){
    return this.http.post<any>(`${this.baseUrl}refresh`, tokenApi)
  }

}
