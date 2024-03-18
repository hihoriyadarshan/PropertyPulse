import { CommonModule } from '@angular/common';
import { Component, OnInit ,inject} from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export default class AdminDashboardComponent implements OnInit {

  authService = inject(AuthService);
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(res=>{
     this.isLoggedIn = this.authService.isLoggedIn();
    })
  }

  logout(){
    localStorage.removeItem("user_id");
    
    this.authService.isLoggedIn$.next(false);
  }
}

