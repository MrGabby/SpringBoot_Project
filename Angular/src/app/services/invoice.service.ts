import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { register } from '../models/register.model';
import { invoice } from '../models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  baseUrl: string = environment.baseUrl;

constructor(private http: HttpClient) {}

getinvoice():Observable<invoice[]>  {
  return this.http.get<invoice[]>(this.baseUrl + '/api/Invoice');

}

}
