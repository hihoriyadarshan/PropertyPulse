  import { CommonModule } from '@angular/common';
  import { Component, OnInit } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { of } from 'rxjs';


  @Component({
    selector: 'app-users',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './users.component.html',
    styleUrl: './users.component.css'
  })
  export default class UsersComponent implements OnInit {
    users: any[] = [];

    constructor(private http: HttpClient) { }
  
    ngOnInit(): void {
      this.http.get<any[]>('http://localhost:8800/api/user/getAllUsers').subscribe(
        (res: any[]) => {
          this.users = res;
        },
        error => {
          console.error('Error fetching users:', error);
        }
      );
    }
  }
  