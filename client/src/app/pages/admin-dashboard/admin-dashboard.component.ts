import { CommonModule } from '@angular/common';
import { Component, OnInit ,inject} from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DashboardService } from '../../services/dashboard.service';

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
  users: any[] = [];
  category: any[] = [];
  subcategory: any[] = [];
  property: any[] = [];
  inqury: any[]= [];
  contact: any[]= [];
  feedback: any[]= [];

  

  constructor(private dashboardService : DashboardService ) {}


  ngOnInit(): void {
    this.getUserCount();
    this.getCategoryCount();
    this.getSubCategoryCount();
    this.getPropertyCount();
    this.getInquryCount();
    this.getContactCount();
    this.getFeedbackCount();

    this.authService.isLoggedIn$.subscribe(res=>{
     this.isLoggedIn = this.authService.isLoggedIn();
    })
  }

  logout(){
    localStorage.removeItem("user_id");
    
    this.authService.isLoggedIn$.next(false);
  }


  getUserCount(): void {
    this.dashboardService.getUserCount()
      .subscribe(
        (response: any) => {
          if (response.success) {
            if (response.total !== undefined) {
              this.users = [{ count: response.total }];
            } else if (Array.isArray(response.users)) {
              this.users = response.users;
            } else {
              console.error('Invalid response format:', response);
            }
          } else {
            console.error('Unsuccessful response:', response);
          }
        },
        (error: any) => {
          console.error('Error fetching users:', error);
        }
      );
  }


  getCategoryCount(): void {
    this.dashboardService.getCategoryCount().subscribe(
      (response: any) => {
        if (response.success) {
          if (response.total !== undefined) {
            this.category = [{ count: response.total }];
          } else if (Array.isArray(response.category)) {
            this.category = response.category;
          } else {
            console.error('Invalid response format:', response);
          }
        } else {
          console.error('Unsuccessful response:', response);
        }
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  

  getSubCategoryCount(): void {
    this.dashboardService.getSubCategoryCount().subscribe(
      (response: any) => {
        if (response.success) {
          if (response.total !== undefined) {
            this.subcategory = [{ count: response.total }];
          } else if (Array.isArray(response.subcategory)) {
            this.subcategory = response.subcategory;
          } else {
            console.error('Invalid response format:', response);
          }
        } else {
          console.error('Unsuccessful response:', response);
        }
      },
      (error: any) => {
        console.error('Error fetching subcategories:', error);
      }
    );
  }
  


  getPropertyCount(): void {
    this.dashboardService.getPropertyCount().subscribe(
      (response: any) => {
        if (response.success) {
          if (response.total !== undefined) {
            this.property = [{ count: response.total }];
          } else if (Array.isArray(response.property)) {
            this.property = response.property;
          } else {
            console.error('Invalid response format:', response);
          }
        } else {
          console.error('Unsuccessful response:', response);
        }
      },
      (error: any) => {
        console.error('Error fetching Property:', error);
      }
    );
  }
  

  getInquryCount(): void {
    this.dashboardService.getInquryCount().subscribe(
      (response: any) => {
        if (response.success) {
          if (response.total !== undefined) {
            this.inqury = [{ count: response.total }];
          } else if (Array.isArray(response.inqury)) {
            this.inqury = response.inqury;
          } else {
            console.error('Invalid response format:', response);
          }
        } else {
          console.error('Unsuccessful response:', response);
        }
      },
      (error: any) => {
        console.error('Error fetching Inqury:', error);
      }
    );
  }



  getContactCount(): void {
    this.dashboardService.getContactCount().subscribe(
      (response: any) => {
        if (response.success) {
          if (response.total !== undefined) {
            this.contact = [{ count: response.total }];
          } else if (Array.isArray(response.contact)) {
            this.contact = response.contact;
          } else {
            console.error('Invalid response format:', response);
          }
        } else {
          console.error('Unsuccessful response:', response);
        }
      },
      (error: any) => {
        console.error('Error fetching Contact:', error);
      }
    );
  }


  getFeedbackCount(): void {
    this.dashboardService.getFeedbackCount().subscribe(
      (response: any) => {
        if (response.success) {
          if (response.total !== undefined) {
            this.feedback = [{ count: response.total }];
          } else if (Array.isArray(response.feedback)) {
            this.feedback = response.feedback;
          } else {
            console.error('Invalid response format:', response);
          }
        } else {
          console.error('Unsuccessful response:', response);
        }
      },
      (error: any) => {
        console.error('Error fetching Feedback:', error);
      }
    );
  }



}

