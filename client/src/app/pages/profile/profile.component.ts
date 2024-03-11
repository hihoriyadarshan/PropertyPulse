import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export default class ProfileComponent implements OnInit {
   userId!: string; // Using definite assignment assertion
  firstName: string | null = null; // Initialized to null
  lastName: string | null = null; 
  email: string | null = null; 

  constructor() { }

  ngOnInit(): void {
    // Retrieve user_id and firstName from localStorage
    const storedUserId = localStorage.getItem('user_id');
    const storedFirstName = localStorage.getItem('firstName');
    const storedLastName = localStorage.getItem('lastName');
    const storedEmail = localStorage.getItem('email');

    // const storedFirstName = localStorage.getItem('firstName');

    if (storedUserId) {
     
      this.userId = storedUserId;
     
      this.firstName = storedFirstName || null;
      this.lastName = storedLastName || null;
      this.email = storedEmail || null;


    } else {
      // Handle case where user_id doesn't exist in localStorage
      console.error('User ID not found in localStorage');
    }
  }
}