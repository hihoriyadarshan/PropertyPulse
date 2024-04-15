import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InquiryService } from '../../services/inquiry.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-user-inquiry',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './user-inquiry.component.html',
  styleUrl: './user-inquiry.component.css'
})
export default class UserInquiryComponent implements OnInit {

  inquiries: any[] = [];
  userId: string | null = '';

  constructor(private inquiryService: InquiryService, private route: ActivatedRoute) { }



  ngOnInit(): void {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.inquiryService.getUserinquiryById(userId).subscribe({
        next: (inquiries) => {
          this.inquiries = inquiries;
         
        },
        error: (err) => {
          console.error('Error fetching user_properties:', err);
        }
      });
    } else {
      console.error('User ID not found in localStorage');
    }
  }


  
}
