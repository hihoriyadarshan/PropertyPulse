import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-feedback',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './admin-feedback.component.html',
  styleUrl: './admin-feedback.component.css'
})
// export default class AdminFeedbackComponent implements OnInit{
//   feedback: any[] = [];

//   constructor(private feedbackService: FeedbackService) {}
  
//   ngOnInit(): void {
//     this.getAllfeedback();
//   }

//   getAllfeedback(): void {
//     this.feedbackService.getAllfeedback()
//       .subscribe(
//         (response: any) => {
//           if (response.status === 200 && Array.isArray(response.data)) {
//             this.feedback = response.data; 
//           } else {
//             console.error('Invalid response format:', response);
//           }
//         },
//         (error: any) => {
//           console.error('Error fetching Feedback:', error);
//         }
//       );
//   }


// }

export default class AdminFeedbackComponent implements OnInit {
  feedback: any[] = [];

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.getAllFeedback();
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
}