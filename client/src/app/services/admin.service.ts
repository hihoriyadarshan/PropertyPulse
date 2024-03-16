import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get('http://localhost:8800/api/user/getAllUsers');
  }
}
