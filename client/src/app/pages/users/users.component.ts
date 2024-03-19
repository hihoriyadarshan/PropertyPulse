  import { CommonModule } from '@angular/common';
  import { Component, OnInit} from '@angular/core';
  import { UsersService } from '../../services/users.service';
  


  @Component({
    selector: 'app-users',
    standalone: true,
    imports: [CommonModule],
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
          (response: any[]) => {
            this.users = response; // Assign response to users array
          },
          (error: any) => {
            console.error('Error fetching users:', error);
          }
        );
    }
  }