import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { propertyUrls } from '../property.urls';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http: HttpClient) { }

  createProperty(propertyData: any) {
    return this.http.post(propertyUrls.propertyServiceApi + 'create_property', propertyData);
  }
}
