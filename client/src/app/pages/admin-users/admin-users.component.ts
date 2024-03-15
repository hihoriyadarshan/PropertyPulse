import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'   
})

// export default class AdminUsersComponent implements OnInit {
//   users: any[] = [];

//   constructor(private adminService: AdminService) { }

//   ngOnInit(): void {
//     this.fetchUsers();
//   }

//   fetchUsers() {
//     this.adminService.getAllUsers().subscribe(
//       (data: any) => {
//         this.users = data;
//       },
//       error => {
//         console.error('Error fetching users:', error);
//       }
//     );
//   }
// }

export default class AdminUsersComponent implements OnInit {
  users: any[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.adminService.getAllUsers().subscribe(
      (data: any) => {
        this.users = data; // Assuming data is an array of users
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }
}