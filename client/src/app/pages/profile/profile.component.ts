import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export default class ProfileComponent implements OnInit {
  userProfile: any;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.userService.getUserProfileById(userId).subscribe({
        next: (profile) => {
          this.userProfile = profile.data; 
        },
        error: (err) => {
          console.error('Error fetching user profile:', err);
          // Handle error if needed
        }
      });
    } else {
      console.error('User ID not found in localStorage');
      // Handle this case, maybe redirect to login page
    }
  }
}