import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from '../../services/feedback.service';



@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule,HttpClientModule,FormsModule,],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export default class AboutComponent {
  contactForm: FormGroup;
  successMessage: string | null = null; // Variable to hold success message

  constructor(private feedbackService: FeedbackService, private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });     
  }

  submitForm() {
    if (this.contactForm.valid) {
      this.feedbackService.createfeedback(this.contactForm.value).subscribe(
        (response: any) => {
          console.log('Feedback created successfully:', response);
          this.successMessage = 'Your feedback sent successfully.';
          this.contactForm.reset();
        },
        (error: any) => {
          console.error('Failed to create contact:', error);
        }
      );
    } else {
      const isFormEmpty = Object.keys(this.contactForm.value).every(key => !this.contactForm.value[key]);
    if (isFormEmpty) {
      alert('Please fill in all required fields.');
    } else {
      // Handle form validation error if needed
    }
  }
  }
}