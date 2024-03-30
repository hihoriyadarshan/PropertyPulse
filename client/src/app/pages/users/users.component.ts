  import { CommonModule } from '@angular/common';
  import { Component, OnInit} from '@angular/core';
  import { UsersService } from '../../services/users.service';
  import { RouterModule } from '@angular/router';
  import { AuthService } from '../../services/auth.service';


  @Component({
    selector: 'app-users',
    standalone: true,
    imports: [CommonModule,RouterModule],
    templateUrl: './users.component.html',
    styleUrl: './users.component.css'
  })
  

  export default class UsersComponent implements OnInit {
    users: any[] = [];
  
    constructor(private usersService: UsersService,private authService: AuthService) {}
  
    ngOnInit(): void {
      this.getAllUsers();
    }
  
    getAllUsers(): void {
      this.usersService.getAllUsers()
        .subscribe(
          (response: any) => {
            if (response.status === 200 && Array.isArray(response.data)) {
              this.users = response.data; 
            } else {
              console.error('Invalid response format:', response);
            }
          },
          (error: any) => {
            console.error('Error fetching users:', error);
          }
        );
    }


    deleteUser(id: string): void {
      if (confirm('Are you sure you want to delete this contact?')) {
        this.authService.deleteuser(id)
          .subscribe(
            (response: any) => {
              console.log('Contact deleted successfully:', response);
              
              this.users = this.users.filter(user => user._id !== id);
            },
            (error: any) => {
              console.error('Error deleting user:', error);
            }
          );
      }
    }
  }