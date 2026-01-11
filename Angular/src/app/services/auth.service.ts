import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.baseUrl;


  UserState!:User;

private CurrentUser = new BehaviorSubject<User>(this.UserState);

changeUserState(user: User){
  this.CurrentUser.next(user);
}

getCurrentUser(){
  return this.CurrentUser.asObservable();
}


  constructor(private http: HttpClient) {}

  login(loginObj:any){
    // const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.post<any>(this.baseUrl + '/api/Auth/login',loginObj);
  }

  setToken(token:string){
    localStorage.setItem("token", token);
  }

  getToken(){
    return localStorage.getItem("token");
  }


}
