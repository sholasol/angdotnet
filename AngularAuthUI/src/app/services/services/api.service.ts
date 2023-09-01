import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = "https://localhost:7230/api/User";

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<any>(this.baseUrl);
  }

  // postRegisteration(registerObj: User){
  //   return this.http.get<User[]>(`${this.baseUrl}`)
  // }

  // getRegisteredUser(){
  //   return this.http.get<User[]>(`${this.baseUrl}`)
  // }
}
