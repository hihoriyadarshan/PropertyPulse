// inquiry.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inquiryUrls } from '../inquiry.urls';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {

  constructor(private http: HttpClient) { }

  createInquiry(inquiryData: any): Observable<any> {
    return this.http.post(inquiryUrls.inquiryServiceApi + 'create-inquiry', inquiryData);
  }

  getAllInquiry(): Observable<any[]> {
    return this.http.get<any[]>(`${inquiryUrls.inquiryServiceApi}get-All-inquiry`);
}

getUserinquiryById(userId: string): Observable<any> {
  return this.http.get(`${inquiryUrls.inquiryServiceApi}user_inquiry/${userId}`);   
}


}
