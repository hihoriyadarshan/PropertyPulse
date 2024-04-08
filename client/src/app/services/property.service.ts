import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { propertyUrls } from '../property.urls';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http: HttpClient) { }

  createProperty(propertyData: any): Observable<any> {
    return this.http.post<any>(propertyUrls.propertyServiceApi + 'create_property', propertyData);
  }

  getAllProperties(): Observable<any[]> {
    return this.http.get<any[]>(`${propertyUrls.propertyServiceApi}getAllproperty`);
  }

  deleteproperty(propertyId: string): Observable<any> {
    return this.http.delete<any>(`${propertyUrls.propertyServiceApi}deleteproperty/${propertyId}`);
  }
  
  getUserPropertyById(userId: string): Observable<any> {
    return this.http.get(`${propertyUrls.propertyServiceApi}user_property/${userId}`);   
  }



  getPropertyPhoto(id: string): Observable<Blob> {
    return this.http.get(`${propertyUrls.propertyServiceApi}${id}`, { responseType: 'blob' })
      .pipe(
        catchError((error: any) => this.handleError(error))
      );
  }



  getPropertyById(propertyId: string): Observable<any> {
    return this.http.get<any>(`${propertyUrls.propertyServiceApi}getPropertyById/${propertyId}`)
      .pipe(
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else if (typeof window === 'undefined') {
      // Server-side error
      errorMessage = `Server-side error: ${error.message}`;
    } else {
      // Browser error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }



}
