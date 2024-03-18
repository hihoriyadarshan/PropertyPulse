import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-admin-contacts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-contacts.component.html',
  styleUrl: './admin-contacts.component.css'
})
export default class AdminContactsComponent implements OnInit{
  contacts: any[] = [];

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.getAllContacts();
  }

  getAllContacts(): void {
    this.userService.getAllContacts()
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