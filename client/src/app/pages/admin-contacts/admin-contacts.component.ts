import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-admin-contacts',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-contacts.component.html',
  styleUrl: './admin-contacts.component.css'
})
export default class AdminContactsComponent implements OnInit {
  contacts: any[] = [];
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) { }



  ngOnInit(): void {
    this.getAllContacts();


    this.authService.isLoggedIn$.subscribe(res=>{
      this.isLoggedIn = this.authService.isLoggedIn();
     })

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

  deleteContact(id: string): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.authService.deleteContact(id)
        .subscribe(
          (response: any) => {
            console.log('Contact deleted successfully:', response);
            // Remove the deleted contact from the contacts array
            this.contacts = this.contacts.filter(contact => contact._id !== id);
          },
          (error: any) => {
            console.error('Error deleting contact:', error);
          }
        );
    }
  }

  logout(){
    localStorage.removeItem("user_id");
    
    this.authService.isLoggedIn$.next(false);
  }

}
