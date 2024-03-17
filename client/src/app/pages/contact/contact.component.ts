import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,HttpClientModule,FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})

export default class ContactComponent {
  contactForm: FormGroup;

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
          // Reset form after successful submission
          this.contactForm.reset();
        },
        (error: any) => {
          console.error('Failed to create contact:', error);
        }
      );
    } else {
      // Handle form validation error
    }
  }
}