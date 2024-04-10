import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule,HttpClientModule,FormsModule,],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})

export default class ContactComponent {
  contactForm: FormGroup;
  successMessage: string | null = null; // Variable to hold success message

  constructor(private userService: UsersService, private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });     
  }

  submitForm() {
    if (this.contactForm.valid) {
      this.userService.createContact(this.contactForm.value).subscribe(
        (response: any) => {
          console.log('Contact created successfully:', response);
          this.successMessage = 'Your message sent successfully.';
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