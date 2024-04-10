import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { InquiryService } from '../../services/inquiry.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-more-details-property',
  standalone: true,
  imports: [CommonModule,RouterModule ,FormsModule,ReactiveFormsModule,],
  templateUrl: './more-details-property.component.html',
  styleUrls: ['./more-details-property.component.css']
})
export default class MoreDetailsPropertyComponent implements OnInit {
  propertyId: string = '';
  propertyDetails: any;
  propertyPhotoMap: Map<string, string> = new Map();
  user_id: string | null = localStorage.getItem('user_id');
  inquiryForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private inquiryService: InquiryService,
    private formBuilder: FormBuilder

  ) {
    this.inquiryForm = this.formBuilder.group({
      name: ['', Validators.required],
      subject: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  authService = inject(AuthService);
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.propertyId = params['id'];
      this.getPropertyDetails();
    });
    this.authService.isLoggedIn$.subscribe(res=>{
      this.isLoggedIn = this.authService.isLoggedIn();
     })
  }

  getPropertyDetails() {
    this.propertyService.getPropertyById(this.propertyId).subscribe(
      (data: any) => {
        this.propertyDetails = data;
        this.getPropertyPhoto(this.propertyDetails._id);
      },
      (error: any) => {
        console.error('Error fetching property details:', error);
      }
    );
  }

  getPropertyPhoto(id: string): void {
    this.propertyService.getPropertyPhoto(id).subscribe(
      (photoBlob: Blob) => {
        this.createImageFromBlob(photoBlob, id);
      },
      (error: any) => {
        console.error('Error fetching property photo:', error);
      }
    );
  }

  createImageFromBlob(image: Blob, id: string): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.propertyPhotoMap.set(id, reader.result as string);
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  submitInquiry(): void {
    if (this.inquiryForm.valid) {
      const inquiryData = {
        user_id: this.user_id || '',
        property_id: this.propertyId,
        name: this.inquiryForm.value.name,
        subject: this.inquiryForm.value.subject,
        email: this.inquiryForm.value.email,
        message: this.inquiryForm.value.message,
        status: 'New'
      };

      this.inquiryService.createInquiry(inquiryData).subscribe(
        (response) => {
          console.log('Inquiry created successfully:', response);
          // Handle success, e.g., show success message or reset form
          this.inquiryForm.reset();
        },
        (error) => {
          console.error('Error creating inquiry:', error);
          // Handle error, e.g., show error message to the user
        }
      );
    } else {
      // Form is invalid, show alert message or perform other actions
      alert('Please fill in all fields before submitting the inquiry.');
    }
  }
}
