import { Injectable,inject  } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable , throwError } from 'rxjs';
import { dashboardUrls } from '../dashboard.urls';
import {  HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
 
  constructor(private http: HttpClient) { }


// user count
  getUserCount(): Observable<any[]> {
    return this.http.get<any[]>(`${dashboardUrls.dashboardServiceApi}user-count`);  
}

  // Category count
  getCategoryCount(): Observable<any[]> {
    return this.http.get<any[]>(`${dashboardUrls.dashboardServiceApi}category-count`);  
  }


// Sub Category count
getSubCategoryCount(): Observable<any[]> {
  return this.http.get<any[]>(`${dashboardUrls.dashboardServiceApi}/subcategory-count`);  
}


// Property count
getPropertyCount(): Observable<any[]> {
  return this.http.get<any[]>(`${dashboardUrls.dashboardServiceApi}property-count`);  
}


// Inquiry count
getInquryCount(): Observable<any[]> {
  return this.http.get<any[]>(`${dashboardUrls.dashboardServiceApi}inquiry-count`);  
}

// Contact count
getContactCount(): Observable<any[]> {
  return this.http.get<any[]>(`${dashboardUrls.dashboardServiceApi}contact-count`);  
}

// Feedback count
getFeedbackCount(): Observable<any[]> {
  return this.http.get<any[]>(`${dashboardUrls.dashboardServiceApi}feedback-count`);  
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
