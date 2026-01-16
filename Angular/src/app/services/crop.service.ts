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

  constructor(private http: HttpClient) { }

  addCrop(c: crop, file?: File): Observable<crop> {
    const formData = new FormData();
    formData.append('cropDetail', new Blob([JSON.stringify(c)], { type: 'application/json' }));
    if (file) {
      formData.append('image', file);
    }
    return this.http.post<crop>(this.baseUrl + '/api/Crop_detail', formData);
  }

  getAllCrops(): Observable<crop[]> {
    return this.http.get<crop[]>(this.baseUrl + '/api/Crop_detail');
  }

  getCropById(id: number): Observable<crop> {
    return this.http.get<crop>(`${this.baseUrl}/api/Crop_detail/${id}`);
  }

  updateCrop(id: number, c: crop, file?: File): Observable<crop> {
    const formData = new FormData();
    formData.append('cropDetail', new Blob([JSON.stringify(c)], { type: 'application/json' }));
    if (file) {
      formData.append('image', file);
    }
    return this.http.post<crop>(`${this.baseUrl}/api/Crop_detail/${id}/update`, formData);
  }

  deleteCrop(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/Crop_detail/${id}`);
  }
}
