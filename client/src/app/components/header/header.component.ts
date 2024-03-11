import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  
  // isLoggedIn: boolean = false;

  // constructor(private authService: AuthService) {}
  // ngOnInit(): void {
    // this.isLoggedIn = this.authService.isLoggedIn();
  // }

  authService = inject(AuthService);
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(res=>{
     this.isLoggedIn = this.authService.isLoggedIn();
    })
  }


  logout(){
    localStorage.removeItem("user_id");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("username");
    localStorage.removeItem("email");

    this.authService.isLoggedIn$.next(false);
  }
}
