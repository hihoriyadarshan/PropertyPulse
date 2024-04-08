import { Injectable } from '@angular/core';
import { feedbackUrls } from '../feedback.urls';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }

  createfeedback(feedbackData: any): Observable<any> {
    return this.http.post<any>(feedbackUrls.feedbackServiceApi + 'create-feedback', feedbackData);
  }

  getAllfeedback(): Observable<any[]> {
    return this.http.get<any[]>(`${feedbackUrls.feedbackServiceApi}getAllFeedback`);  
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
