import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { usersUrls } from '../users.urls';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(private http: HttpClient) {}

  getUserProfileById(userId: string): Observable<any> {
    return this.http.get(`${usersUrls.authServiceApi}${userId}`); // Remove extra slash here
  }
}