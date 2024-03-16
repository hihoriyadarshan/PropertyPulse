// admin-users.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminService } from '../../services/admin.service';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export default class AdminUsersComponent implements OnInit {
  users: User[] = []; // Initialize users array

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
        // console.log('All user profiles:', this.users);
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }
}
