import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { register } from '../models/register.model';
import { crop } from '../models/crop.model';

@Injectable({
  providedIn: 'root'
})
export class CropService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  addCrop(c:crop):Observable<crop> {
    return this.http.post<crop>(this.baseUrl + '/api/Crop_detail',c);
  }

  getAllCrops(): Observable<crop[]> {
    return this.http.get<crop[]>(this.baseUrl + '/api/Crop_detail');
  }

  getCropById(id: number): Observable<crop> {
    return this.http.get<crop>(`${this.baseUrl}/api/Crop_detail/${id}`);
  }
}
