import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-feedback',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './admin-feedback.component.html',
  styleUrl: './admin-feedback.component.css'
})


export default class AdminFeedbackComponent implements OnInit {
  feedback: any[] = [];
  isLoggedIn: boolean = false;

  constructor(private feedbackService: FeedbackService,private authService :AuthService) {}

  ngOnInit(): void {
    this.getAllFeedback();

    this.authService.isLoggedIn$.subscribe(res=>{
      this.isLoggedIn = this.authService.isLoggedIn();
     })
  }

  getAllFeedback(): void {
    this.feedbackService.getAllfeedback() // Change to getAllfeedback()
      .subscribe(
        (response: any) => {
          if (response.success && Array.isArray(response.contacts)) {
            this.feedback = response.contacts;
          } else {
            console.error('Invalid response format:', response);
          }
        },
        (error: any) => {
          console.error('Error fetching Feedback:', error);
        }
      );
  }
  logout(){
    localStorage.removeItem("user_id");
    
    this.authService.isLoggedIn$.next(false);
  }
 


}