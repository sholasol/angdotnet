import { Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //create url => we can get it from swagger
  private baseUrl:string = "https://localhost:7230/api/User/";
  constructor(private http: HttpClient) { }


  //register object and type any
  signup(userObj:any){
    return this.http.post<any>(`${this.baseUrl}register`, userObj);
  }

  //login object and type any
  login(loginObj: any){
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj);
  }
}
