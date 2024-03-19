import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-contacts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-contacts.component.html',
  styleUrl: './admin-contacts.component.css'
})
export default class AdminContactsComponent implements OnInit{
  contacts: any[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getAllContacts();
  }

  getAllContacts(): void {
    this.authService.getAllContacts()
      .subscribe(
        (response: any) => {
          this.contacts = response; // Assign response to contacts array
        },
        (error: any) => {
          console.error('Error fetching contacts:', error);
        }
      );
  }
}