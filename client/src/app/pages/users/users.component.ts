  import { CommonModule } from '@angular/common';
  import { Component, OnInit} from '@angular/core';
  import { UsersService } from '../../services/users.service';
import { RouterModule } from '@angular/router';
  


  @Component({
    selector: 'app-users',
    standalone: true,
    imports: [CommonModule,RouterModule],
    templateUrl: './users.component.html',
    styleUrl: './users.component.css'
  })
  

  export default class UsersComponent implements OnInit {
    users: any[] = [];
  
    constructor(private usersService: UsersService) {}
  
    ngOnInit(): void {
      this.getAllUsers();
    }
  
    getAllUsers(): void {
      this.usersService.getAllUsers()
        .subscribe(
          (response: any) => {
            if (response.status === 200 && Array.isArray(response.data)) {
              this.users = response.data; // Assign array of users from response.data
            } else {
              console.error('Invalid response format:', response);
            }
          },
          (error: any) => {
            console.error('Error fetching users:', error);
          }
        );
    }
  }