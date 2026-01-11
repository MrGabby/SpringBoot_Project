import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { register } from '../models/register.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  baseUrl: string = environment.baseUrl;

constructor(private http: HttpClient) {}

addUser(addUserRequest:register) : Observable<register> {
  return this.http.post<register>(this.baseUrl + '/api/Auth/register',addUserRequest);
}

}
