import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { propertyUrls } from '../property.urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http: HttpClient) { }

  createProperty(propertyData: any) {
    return this.http.post(propertyUrls.propertyServiceApi + 'create_property', propertyData);
  }

  getAllproperty(): Observable<any[]> {
    return this.http.get<any[]>(`${propertyUrls.propertyServiceApi}getAllproperty`);
}

}
